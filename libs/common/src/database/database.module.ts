import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      dataSourceFactory: options => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class DatabaseModule {}
