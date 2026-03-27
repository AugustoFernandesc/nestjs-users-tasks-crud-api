import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  // Valida as credenciais comparando o e-mail e o hash da senha (bcrypt)
  async validateUser(email: string, pass: string){
    const foundUser = await this.userService.findByEmail(email);

    // Se o usuário não existir ou a senha for inválida, retorna nulo
    if (!foundUser || !bcryptCompareSync(pass, foundUser.password)) {
       return null;
    }
    
    // Remove a senha do objeto de retorno para segurança no fluxo do Passport
    const {password, ...result} = foundUser;
    return result;
  }

  // Gera o token JWT assinado após a autenticação bem-sucedida
  async login(user: {id: string, email:string}) {
    // Define o payload (sub é o ID do usuário, padrão do JWT)
    const payload = { sub: user.id, email: user.email };

    // Assina o token usando a chave secreta vinda das variáveis de ambiente
    const token = await this.jwtService.signAsync(payload, 
      //secret: this.configService.get<string>('JWT_SECRET_ACCESS'),
    );

    // Retorna o token com a chave 'access_token'
    return { 
      access_token: token 
    };
  }
}