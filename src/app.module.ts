import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReposModule } from './repos/repos.module';
import { GithubModule } from './github/github.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReposModule,
    GithubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
