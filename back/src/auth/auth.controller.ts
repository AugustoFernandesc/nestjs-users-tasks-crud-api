import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService
  ){}

  // Rota de login protegida pelo LocalAuthGuard
  // Valida o e-mail e senha antes de executar o método
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // Após a validação do Passport, os dados do usuário ficam no 'req.user'
    // O método signIn gera e retorna o 'access_token' (JWT) exigido no PDF
    return this.authService.login(req.user);
  }
}