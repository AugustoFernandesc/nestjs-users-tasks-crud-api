import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

/**
 * O UpdateAuthDto estende o CreateAuthDto usando PartialType.
 * Isso torna todos os campos definidos no DTO de criação opcionais, permitindo atualizações parciais de credenciais ou perfis.
 */
export class UpdateAuthDto extends PartialType(CreateAuthDto) {}