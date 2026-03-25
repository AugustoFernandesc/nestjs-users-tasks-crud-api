import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const userAlreadyRegistered = await this.findByEmail(createUserDto.email);
    
    if(userAlreadyRegistered){
      throw new ConflictException(`User '${createUserDto.email}' already registered`);
    }
    
    const newUser = this.usersRepository.create({...createUserDto, password: bcryptHashSync(createUserDto.password, 10)});
    return await this.usersRepository.save(newUser);

  }

  async findByEmail(email: string){
    const userFound = await this.usersRepository.findOne({where: {email}})

    if(!userFound){
      return null;
    }
    return {
      id: userFound.id,
      email: userFound.email,
      password: userFound.password
  }
}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
     return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); 
    
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    
    await this.usersRepository.softDelete(id);
    return { message: `Usuário ${user.name} removido com sucesso` };
  }
  } 

