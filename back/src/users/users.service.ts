import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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
    // Verifica se o e-mail já existe para evitar duplicidade
    const userAlreadyRegistered = await this.findByEmail(createUserDto.email);
    
    if(userAlreadyRegistered){
      throw new ConflictException(`User '${createUserDto.email}' already registered`);
    }
    
    // Cria o usuário criptografando a senha com bcrypt antes de salvar
    const newUser = this.usersRepository.create({
      ...createUserDto, 
      password: bcryptHashSync(createUserDto.password, 10)
    });

    await this.usersRepository.save(newUser);

    // Remove a senha do objeto de retorno por segurança
    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    // Busca usuário pelo e-mail forçando o 'select' da senha para uso no login
    const userFound = await this.usersRepository.findOne({
      where: { email }, 
      select: ['id', 'name', 'email', 'password']
    });

    if (!userFound) {
      return null;
    }
    return userFound;
  }

  //busca usuario por nome, para filtrar somente o usuario que eu preciso
  async findByName(name:string){
    return await this.usersRepository.find({where: {name: ILike(`%${name}%`)}})
  }

  async findAll() {
    // Lista todos os usuários (a senha não virá devido ao select: false na Entity)
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    // Busca um usuário específico por ID (UUID)
    const user = await this.usersRepository.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
     return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Verifica existência antes de atualizar
    await this.findOne(id); 

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    // Realiza o soft delete (exclusão lógica) do usuário
    const user = await this.findOne(id);
    
    await this.usersRepository.softDelete(id);
    return { message: `Usuário ${user.name} removido com sucesso` };
  }
}