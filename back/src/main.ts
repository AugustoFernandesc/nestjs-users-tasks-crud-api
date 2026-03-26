import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o acesso do Frontend (CORS) 
  app.enableCors();

  // Ativa a validação automática via DTOs (class-validator) 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Inicia o servidor na porta 3000 ou definida no .env 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();