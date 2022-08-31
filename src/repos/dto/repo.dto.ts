import { IsNotEmpty, IsString } from 'class-validator';

export class RepoDTO {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  repo: string;
}
