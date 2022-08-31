import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Octokit } from 'octokit';
import { RepoDTO } from 'src/repos/dto/repo.dto';
import { Repository } from 'typeorm';
import { Clone } from './entities/clones.entity';
import { Path } from './entities/paths.entity';
import { Referrer } from './entities/referrers.entity';
import { View } from './entities/views.entity';

interface APIBasicInfo {
  count: number;
  uniques: number;
  title?: string;
  path?: string;
  timestamp?: string;
  rank?: number;
}

export interface APIInfo extends APIBasicInfo {
  owner: string;
  repo: string;
}

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor(
    @InjectRepository(Clone)
    private cloneRepo: Repository<Clone>,
    @InjectRepository(View)
    private viewRepo: Repository<View>,
    @InjectRepository(Path)
    private pathRepo: Repository<Path>,
    @InjectRepository(Referrer)
    private referrerRepo: Repository<Path>,
  ) {
    this.octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  }

  async getCloneInfo({ owner, repo }: RepoDTO): Promise<APIInfo[]> {
    const out = await this.octokit.request(
      'GET /repos/{owner}/{repo}/traffic/clones',
      { owner, repo },
    );
    return this.addRepoOwnerAndName(out['data']['clones'], { owner, repo });
  }

  async getTopReferralsPaths({ owner, repo }: RepoDTO): Promise<APIInfo[]> {
    const out = await this.octokit.request(
      'GET /repos/{owner}/{repo}/traffic/popular/paths',
      { owner, repo },
    );
    const completeRepo = this.addRepoOwnerAndName(out['data'], { owner, repo });
    return this.addTodayTimestampAndRank(completeRepo);
  }

  async getTopReferrals({ owner, repo }: RepoDTO): Promise<APIInfo[]> {
    const out = await this.octokit.request(
      'GET /repos/{owner}/{repo}/traffic/popular/referrers',
      { owner, repo },
    );
    const completeRepo = this.addRepoOwnerAndName(out['data'], { owner, repo });
    return this.addTodayTimestampAndRank(completeRepo);
  }

  async getPageViews({ owner, repo }: RepoDTO): Promise<APIInfo[]> {
    const out = await this.octokit.request(
      'GET /repos/{owner}/{repo}/traffic/views',
      { owner, repo },
    );
    return this.addRepoOwnerAndName(out['data']['views'], { owner, repo });
  }

  async isRecheable({ owner, repo }: RepoDTO): Promise<boolean> {
    try {
      await this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  private addRepoOwnerAndName(
    apiBasicInfo: APIBasicInfo[],
    { owner, repo }: RepoDTO,
  ): APIInfo[] {
    return apiBasicInfo.map((basicInfo) => {
      return {
        owner,
        repo,
        ...basicInfo,
      };
    });
  }

  private addTodayTimestampAndRank(apiInfo: APIInfo[]): APIInfo[] {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    const isoDate = d.toISOString();
    return apiInfo.map((apiInfo, idx) => {
      return {
        ...apiInfo,
        timestamp: isoDate,
        rank: idx + 1,
      };
    });
  }

  saveClones(clones: Clone[]) {
    return this.cloneRepo.save(clones);
  }

  saveViews(views: View[]) {
    return this.viewRepo.save(views);
  }

  savePaths(paths: Path[]) {
    return this.pathRepo.save(paths);
  }

  saveReferrels(referrels: Referrer[]) {
    return this.referrerRepo.save(referrels);
  }
}
