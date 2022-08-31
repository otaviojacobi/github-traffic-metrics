import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Referrer {
  @PrimaryColumn()
  owner: string;

  @PrimaryColumn()
  repo: string;

  @PrimaryColumn('date')
  timestamp: string;

  @PrimaryColumn('int')
  rank: number;

  @Column()
  referrer: string;

  @Column('int')
  count: number;

  @Column('int')
  uniques: number;
}
