import { IsString } from "class-validator";

/**
 * DTO responsável por tipar a resposta de autenticação.
 * Garante que o token e o tempo de expiração sigam o formato exigido no PDF.
 */
export class CreateAuthDto {

    // Token JWT gerado pelo AuthService após o login bem-sucedido
    @IsString()
    access_token: string;

    // Tempo de vida do token (em segundos ou milissegundos), vindo do .env
    expiresIn: number;

}