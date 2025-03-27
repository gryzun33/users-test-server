import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CatchEverythingFilter } from './common/catch-everything.filter';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT ?? 4000;

  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));

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
