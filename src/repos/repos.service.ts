import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GithubService } from 'src/github/github.service';
import { Repository } from 'typeorm';
import { RepoDTO } from './dto/repo.dto';
import { Repo } from './entities/repo.entity';

@Injectable()
export class ReposService {
  constructor(
    @InjectRepository(Repo)
    private repoRepository: Repository<Repo>,
    private githubService: GithubService,
  ) {}

  async create(repo: RepoDTO) {
    if (await this.githubService.isRecheable(repo)) {
      return this.repoRepository.save(repo);
    }
    throw new NotFoundException(
      `Repo '${repo.owner}/${repo.repo}' does not exist or can't be reached`,
    );
  }

  findAll() {
    return this.repoRepository.find();
  }

  async findOne(repo: RepoDTO) {
    const foundRepo = await this.repoRepository.findOneBy({ ...repo });
    if (!foundRepo) {
      throw new NotFoundException(
        `Repo '${repo.owner}/${repo.repo}' is not registed for storing`,
      );
    }
    return foundRepo;
  }

  async remove(repo: RepoDTO) {
    const deleted = await this.repoRepository.delete({ ...repo });

    if (deleted.affected === 0) {
      throw new NotFoundException(
        `Repo '${repo.owner}/${repo.repo}' is not registed for storing, so it can't be deleted`,
      );
    }

    return null;
  }
}
