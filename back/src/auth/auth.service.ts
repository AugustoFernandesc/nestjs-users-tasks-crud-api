import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSecons: number
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){
    this.jwtExpirationTimeInSecons = this.configService.get<String>("JWT_EXPIRES_IN") as any;
  }

async signIn(email: string, password: string) {
  const foundUser = await this.userService.findByEmail(email);

  // Validação (Bcrypt + Email)
  if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
    throw new UnauthorizedException();
  }

  const payload = { sub: foundUser.id, email: foundUser.email };

  // TROCA AQUI: signAsync com a secret explícita
  const token = await this.jwtService.signAsync(payload, {
    secret: this.configService.get<string>('JWT_SECRET_ACCESS'),
  });

  // TROCA AQUI: Busca o expiresIn direto do configService
  return { 
    token, 
    expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') 
  };
}

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
