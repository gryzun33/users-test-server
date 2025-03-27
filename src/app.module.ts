import { Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    process.on('uncaughtException', (err) => {
      console.error(`Uncaught Exception: ${err.message}\n`, err.stack);
    });

    process.on('unhandledRejection', (reason: any) => {
      if (reason instanceof Error) {
        console.error(`Unhandled Rejection: ${reason.message}\n`, reason.stack);
      } else {
        console.error(`Unhandled Rejection: ${JSON.stringify(reason)}`);
      }
    });
  }
}
