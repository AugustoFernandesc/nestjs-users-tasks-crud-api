import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura o Passport para usar o campo 'email' em vez do padrão 'username'
    super({
        usernameField: 'email',
    });
  }

  // Método de validação chamado automaticamente pelo LocalAuthGuard no login
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    
    // Se as credenciais forem inválidas, interrompe a requisição com 401 Unauthorized
    if (!user) {
      throw new UnauthorizedException();
    }
    
    // Retorna o usuário validado para ser anexado ao objeto 'req.user'
    return user;
  }
}