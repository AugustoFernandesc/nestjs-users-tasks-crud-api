import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  // Registra as entidades Task e User para permitir a injeção de seus repositórios no TasksService
  imports: [TypeOrmModule.forFeature([Task, User])],
  
  // Define o controlador responsável pelas rotas de tarefas
  controllers: [TasksController],
  
  // Define o serviço que contém a lógica de negócio das tarefas
  providers: [TasksService],
})
export class TasksModule {}