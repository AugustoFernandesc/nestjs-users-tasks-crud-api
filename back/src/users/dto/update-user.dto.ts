import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * O UpdateUserDto estende o CreateUserDto usando PartialType.
 * Isso torna todos os campos do cadastro (nome, email, senha) opcionais para atualizações parciais (PATCH/PUT). 
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}