import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Repo {
  @PrimaryColumn()
  owner: string;

  @PrimaryColumn()
  repo: string;

  @CreateDateColumn()
  created_at: Date;
}
