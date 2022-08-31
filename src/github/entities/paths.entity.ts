import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Path {
  @PrimaryColumn()
  owner: string;

  @PrimaryColumn()
  repo: string;

  @PrimaryColumn('date')
  timestamp: string;

  @PrimaryColumn('int')
  rank: number;

  @Column()
  title: string;

  @Column()
  path: string;

  @Column('int')
  count: number;

  @Column('int')
  uniques: number;
}
