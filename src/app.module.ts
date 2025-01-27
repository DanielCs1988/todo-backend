import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      },
    }),
    TodoModule,
  ],
})
export class AppModule {}
