import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReposService } from './repos.service';
import { RepoDTO } from './dto/repo.dto';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Post()
  async create(@Body() repo: RepoDTO) {
    return await this.reposService.create(repo);
  }

  @Get()
  findAll() {
    return this.reposService.findAll();
  }

  @Get('/:owner/:repo')
  findOne(@Param('owner') owner: string, @Param('repo') repo: string) {
    return this.reposService.findOne({ owner, repo });
  }

  @Delete('/:owner/:repo')
  @HttpCode(204)
  remove(@Param('owner') owner: string, @Param('repo') repo: string) {
    return this.reposService.remove({ owner, repo });
  }
}
