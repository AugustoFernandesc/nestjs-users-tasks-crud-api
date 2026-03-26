import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

/**
 * O UpdateTaskDto utiliza o PartialType para herdar os campos do CreateTaskDto.
 * Isso torna campos como 'title', 'description' e 'userId' opcionais em requisições de atualização (PATCH/PUT).
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}