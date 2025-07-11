import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true, // 영속성 유지
      synchronize: true,
      logging: true, // 쿼리 로깅
    }),
    AuthModule,
    UserModule,
    VideoModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
