import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Shop Cart API')
    .setDescription('API to manage products (CRUD), users (CRUD) and orders (user buy products relation)')
    .setVersion('1.0')
    .addTag('REST_API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);

  await app.listen(3000);
}
bootstrap();
