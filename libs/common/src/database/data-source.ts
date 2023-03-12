import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

console.log(path.join(__dirname, '/entities/*.entity{.ts,.js}'));

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5433,
  username: process.env.DB_USER || 'nestjs',
  password: process.env.DB_PASS || 'nestjspw',
  database: process.env.DB_NAME || 'nestjs_db',
  schema: process.env.DB_SCHEMA || 'public',
  synchronize: Boolean(process.env.DB_SYNC === 'true') || false,
  entities: [path.join(__dirname, '/entities/*.entity{.ts,.js}')],
  subscribers: [path.join(__dirname, '/subscribers/*{.ts,.js}')],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  logging: Boolean(process.env.NODE_ENV !== 'production') || false,
};

export default new DataSource(typeOrmOptions as DataSourceOptions);
