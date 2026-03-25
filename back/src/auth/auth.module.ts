import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_ACCESS'),
        signOptions: {expiresIn: Number(configService.get<string>('JWT_EXPIRES_IN'))} 
      }),
      inject: [ConfigService],
    }),
    UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}