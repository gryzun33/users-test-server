import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggingService: LoggingService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message =
        typeof response === 'string'
          ? response
          : (response as { message: string }).message ||
            'Internal Server Error';
    } else {
      message = 'Internal Server Error';
    }

    const stack = exception instanceof Error ? exception.stack : '';

    this.loggingService.error(
      `Exception: ${message} on ${request.method} ${request.originalUrl}`,
      stack,
    );

    const responseBody = {
      statusCode: httpStatus,
      message,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
