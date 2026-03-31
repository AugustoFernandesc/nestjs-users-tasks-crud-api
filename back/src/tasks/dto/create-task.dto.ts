import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
    
    // Valida se o título é uma string e se não foi enviado vazio
    @IsString() 
    @IsNotEmpty()
    title: string;
    
    // Valida se a descrição é uma string e se não foi enviada vazia
    @IsNotEmpty() 
    @IsString()
    description: string;
    
    // Valida se o status da tarefa (concluída ou não) é um booleano
    @IsBoolean()
    completed: boolean;
    
    // Valida se o ID do usuário dono da tarefa é um UUID válido (Chave Estrangeira)
    @IsOptional() 
    userId: string;
}