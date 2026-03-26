import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * O LocalAuthGuard herda do AuthGuard com a estratégia 'local'.
 * Ele serve como um "gatilho" para disparar a lógica de validação do e-mail e senha no momento do login.
 */
export class LocalAuthGuard extends AuthGuard('local') {}