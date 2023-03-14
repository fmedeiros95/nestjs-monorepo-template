import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'users-service',
      },
      consumer: {
        groupId: 'users-service-consumer',
      },
    },
  });
  await app.listen();
  logger.log('Users service is listening...');
}
bootstrap();
