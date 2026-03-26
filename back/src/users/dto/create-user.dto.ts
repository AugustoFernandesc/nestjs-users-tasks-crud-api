import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    // Garante que o nome não seja enviado vazio e seja do tipo texto
    @IsNotEmpty() 
    @IsString()
    name: string;

    // Valida se o formato do texto enviado é um e-mail válido 
    @IsEmail()
    email: string;

    // Valida se o campo de status do usuário é um booleano
    @IsBoolean()
    isActive: boolean;
    
    // Define que a senha deve ser uma string 
    @IsString() 
    password: string;

}