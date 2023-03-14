import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'users-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class AppModule {}
