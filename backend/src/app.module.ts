import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging/logging.middleware';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    LoggingModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly loggingService: LoggingService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
  onModuleInit() {
    process.on('uncaughtException', (err) => {
      this.loggingService.error(
        `Uncaught Exception: ${err.message}`,
        err.stack,
      );
    });

    process.on('unhandledRejection', (reason: any) => {
      if (reason instanceof Error) {
        this.loggingService.error(
          `Unhandled Rejection: ${reason.message}`,
          reason.stack,
        );
      } else {
        this.loggingService.error(`Unhandled Rejection: ${reason}`);
      }
    });
  }
}
