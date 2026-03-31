import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'; 

// Aplica a proteção JWT em todas as rotas deste controller [
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Criação de tarefa: permitida apenas para usuários autenticados 
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const userId = req.user.id;
    
    return this.tasksService.create({
      ...createTaskDto,
      userId: userId
    });
  }

  // Listagem de todas as tarefas protegida por Guard 
  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.id);
  }

  // Busca de tarefa por Titulo
  //Implementei pro front fica com essa busca por titulo
  @Get('search')
  async search(@Query('title') title: string, @Request() req) {
    const userId = req.user.id;
    return this.tasksService.findByTitle(title, userId);
  }

  // Busca de tarefa específica com conversão de ID para número
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  // Atualização de tarefa protegida por autenticação 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  // Remoção de tarefa protegida por autenticação 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}