import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  // Registra as entidades User e Task para que o Repository possa ser injetado nos services 
  imports: [TypeOrmModule.forFeature([User, Task])], 
  
  controllers: [UsersController],
  
  providers: [UsersService],
  
  // Exporta o UsersService para que o AuthModule possa usá-lo na validação de login 
  exports: [UsersService]
})
export class UsersModule {}