import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));

  const PORT = process.env.PORT ?? 4000;
  await app.listen(PORT);
  console.log(`Application is running on port ${PORT}`);
}

bootstrap().catch((error) => {
  console.error('Error during application startup:', error);
  process.exit(1);
});
