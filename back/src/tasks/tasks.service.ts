import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
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
    const user = await this.userRepository.findOne({where:{id: createTaskDto.userId}});
    if(!user){
      throw new NotFoundException(`Usuario nao encontrado`)
    }
    const newTask = this.taskRepository.create({...createTaskDto, user});
    return await this.taskRepository.save(newTask);
  }

  async findAll() {
    return await this.taskRepository.find({relations: ["user"]});
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({where: {id}, relations: ["user"]});
    if(!task){
      throw new NotFoundException('Task nao encontrada')
    }else{
      return task;
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({id});
    if(!task){
      throw new NotFoundException(`Task com ID ${id} nao encontrado`)
    }else{
      await this.taskRepository.update(id, updateTaskDto);
      return this.findOne(id);
    }
    
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    if(!task){
        throw new NotFoundException(`Task com ID ${id} nao encontrado`)
    }else{
      await this.taskRepository.delete(id);
      return {message: `Task com titulo: '${task.title}' exlcuida`}
    }
  }
}
