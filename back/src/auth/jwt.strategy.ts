import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) { 
    super({
      // Extrai o token do cabeçalho 'Authorization' como um 'Bearer Token'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Rejeita tokens que já expiraram conforme o tempo definido no .env
      ignoreExpiration: false,
      
      // Recupera a chave secreta diretamente das variáveis de ambiente para validação
      secretOrKey: configService.get<string>('JWT_SECRET_ACCESS') as string, 
    });
  }

  // Método chamado após o token ser validado; extrai os dados (payload) do JWT
  async validate(payload: any) {
    // Retorna os dados do usuário que ficarão disponíveis em 'req.user' nas rotas protegidas
    return { id: payload.sub, email: payload.email };
  }
} 