/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './routes/board/board.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import  ConfigModule  from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './routes/user/user.module';
import { AuthModule } from './auth/auth.module';
import {config} from 'dotenv';
config({path: '.env.local'});

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true
    }),
    BoardModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
