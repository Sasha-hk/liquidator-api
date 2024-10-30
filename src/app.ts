import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middlewares
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      disableErrorMessages: false,
    }),
  );
  app.enableCors();

  // Swagger
  const swaggerOption: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const config = new DocumentBuilder()
    .setTitle('Liquider API')
    .addSecurity('Bearer', {
      type: 'http',
      scheme: 'Bearer',
    })
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config, swaggerOption);
  SwaggerModule.setup('swagger', app, document);

  return app;
}
