import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Clone {
  @PrimaryColumn()
  owner: string;

  @PrimaryColumn()
  repo: string;

  @PrimaryColumn('date')
  timestamp: string;

  @Column('int')
  count: number;

  @Column('int')
  uniques: number;
}
