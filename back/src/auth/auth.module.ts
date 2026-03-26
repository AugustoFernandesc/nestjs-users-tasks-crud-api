import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    // Habilita o uso do Passport para autenticação Local e JWT
    PassportModule,
    
    // Permite que o AuthModule acesse a tabela de Usuários no banco
    TypeOrmModule.forFeature([User]),
    
    // Configura o JWT de forma assíncrona usando variáveis do .env
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_ACCESS'),
        signOptions: { 
          expiresIn: Number(configService.get<string>('JWT_EXPIRES_IN')) 
        } 
      }),
      inject: [ConfigService],
    }),
    
    // Importa o módulo de usuários para validar credenciais no login
    UsersModule
  ],
  controllers: [AuthController],
  
  // Registra os serviços e as estratégias (Local e JWT) como provedores
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}