import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Carrega variáveis de ambiente (.env) de forma global para todo o projeto 
    ConfigModule.forRoot({ isGlobal: true }), 
    
    // Configuração da conexão com o banco de dados PostgreSQL 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // Carrega as entidades automaticamente sem precisar listá-las
      synchronize: true, // Sincroniza as tabelas com as entidades (usar apenas em dev)
    }),

    // Importação dos módulos da aplicação 
    UsersModule, 
    TasksModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}