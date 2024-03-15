import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My E-Commerce service')
    .setDescription('My E-Commerce easy API')
    .setVersion('1.0')
    .addTag('E-Commerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger/api', app, document);

  await app.listen(5090);
}
bootstrap();
