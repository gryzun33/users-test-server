import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CatchEverythingFilter } from './common/catch-everything.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT ?? 4000;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const loggingService = app.get(LoggingService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter, loggingService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap().catch((error) => {
  console.error('Error during application startup:', error);
  process.exit(1);
});
