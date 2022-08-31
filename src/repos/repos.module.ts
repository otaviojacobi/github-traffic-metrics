import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repo } from './entities/repo.entity';
import { GithubModule } from 'src/github/github.module';

@Module({
  imports: [TypeOrmModule.forFeature([Repo]), GithubModule],
  providers: [ReposService],
  controllers: [ReposController],
  exports: [ReposService],
})
export class ReposModule {}
