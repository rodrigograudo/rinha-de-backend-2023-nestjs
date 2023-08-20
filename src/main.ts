import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const errorsMessages = [];
        let isSemanticError = false;

        for (const error of errors) {
          if (Object.keys(error.constraints).includes('isString')) {
            isSemanticError = true;
          }

          errorsMessages.push(...Object.values(error.constraints));
        }

        if (isSemanticError) {
          return new BadRequestException(errorsMessages);
        } else {
          return new UnprocessableEntityException(errorsMessages);
        }
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
