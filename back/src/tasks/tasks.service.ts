import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ILike, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createTaskDto: CreateTaskDto) {
    // Valida se o usuário informado no DTO realmente existe no banco [cite: 34]
    const user = await this.userRepository.findOneBy({id: createTaskDto.userId});
    if(!user){
      throw new NotFoundException(`Usuario nao encontrado`)
    }
    
    // Cria a tarefa vinculando-a ao objeto usuário encontrado (Relacionamento) 
    const newTask = this.taskRepository.create({...createTaskDto, user});
    await this.taskRepository.save(newTask);
    return `Tarefa '${createTaskDto.title}' selecionada com sucesso`;
  }

  async findAll(userId: string) {
    // Retorna todas as tarefas incluindo os dados do usuário dono (Eager Loading)
    return await this.taskRepository.find({where: {userId: userId}, relations: ["user"]});
  }

  //busca tarefa por titulo, para filtrar somente a tarefa que eu preciso
  async findByTitle(title:string, userId:string){
    return await this.taskRepository.find({where: {title: ILike(`%${title}%`), userId: userId}})
  }

  async findOne(id: number) {
    // Busca uma tarefa específica e traz os dados do relacionamento com usuário
    const task = await this.taskRepository.findOne({where: {id}, relations: ["user"]});
    if(!task){
      throw new NotFoundException('Task nao encontrada')
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // Verifica existência da tarefa antes de aplicar a atualização
    const task = await this.taskRepository.findOneBy({id});
    if(!task){
      throw new NotFoundException(`Task com ID ${id} nao encontrado`)
    }
    
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    // Realiza a exclusão lógica (soft delete) para manter integridade dos dados
    const task = await this.findOne(id);
    await this.taskRepository.softDelete(id);
    return {message: `Task com titulo: '${task.title}' excluida`}
  }
}