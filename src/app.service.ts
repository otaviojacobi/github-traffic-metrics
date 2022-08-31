import { Injectable } from '@nestjs/common';
import { Clone } from './github/entities/clones.entity';
import { Path } from './github/entities/paths.entity';
import { Referrer } from './github/entities/referrers.entity';
import { View } from './github/entities/views.entity';
import { GithubService } from './github/github.service';
import { ReposService } from './repos/repos.service';

@Injectable()
export class AppService {
  constructor(
    private githubService: GithubService,
    private repoService: ReposService,
  ) {}

  ping(): string {
    return 'ok';
  }

  async triggerStore() {
    const repos = await this.repoService.findAll();

    for (const repo of repos) {
      const cloneInfo = await this.githubService.getCloneInfo(repo);
      await this.githubService.saveClones(cloneInfo as Clone[]);

      const viewInfo = await this.githubService.getPageViews(repo);
      await this.githubService.saveViews(viewInfo as View[]);

      const pathInfo = await this.githubService.getTopReferralsPaths(repo);
      await this.githubService.savePaths(pathInfo as Path[]);

      const referrerInfo = await this.githubService.getTopReferrals(repo);
      await this.githubService.saveReferrels(referrerInfo as Referrer[]);
    }
    return 'ok';
  }
}
