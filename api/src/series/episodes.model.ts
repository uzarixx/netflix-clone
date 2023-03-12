import {
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Seasons } from './seasons.model';


interface EpisodesCreationAttrs {
  seasonId: number;
  numberEpisode: number;
  numberSeason: number;
  name: string;
  description: string;
  videoLink: string;
  length: string;
}

@Table({ tableName: 'episodes' })
export class Episodes extends Model<Episodes, EpisodesCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Seasons)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seasonId: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  numberEpisode: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  numberSeason: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @Column({ type: DataType.STRING, allowNull: false })
  videoLink: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  length: string;

}
