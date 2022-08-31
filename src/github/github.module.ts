import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clone } from './entities/clones.entity';
import { Path } from './entities/paths.entity';
import { Referrer } from './entities/referrers.entity';
import { View } from './entities/views.entity';
import { GithubService } from './github.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clone, View, Referrer, Path])],
  providers: [GithubService],
  exports: [GithubService],
})
export class GithubModule {}
