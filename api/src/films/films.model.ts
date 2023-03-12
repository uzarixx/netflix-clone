import {
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Content } from '../content/content.model';


interface FilmsCreationAttrs {
  contentId: number;
  videoLink: string;
  length: number;
}

@Table({ tableName: 'films' })
export class Films extends Model<Films, FilmsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Content)
  @Column({ type: DataType.INTEGER, allowNull: false })
  contentId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  videoLink: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  length: number;
}
