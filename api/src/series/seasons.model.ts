import {
  Column,
  DataType,
  Model,
  Table,
  HasMany, ForeignKey,
} from 'sequelize-typescript';
import { Episodes } from './episodes.model';
import { Content } from '../content/content.model';


interface SeasonsCreationAttrs {
  name: string;
  numberSeason: number;
  contentId: number;
}

@Table({ tableName: 'seasons' })
export class Seasons extends Model<Seasons, SeasonsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  numberSeason: number;
  @ForeignKey(() => Content)
  @Column({ type: DataType.INTEGER, allowNull: false })
  contentId: number;

  @HasMany(() => Episodes)
  episodes: Episodes[];
}
