import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { Content } from '../content/content.model';
import { CategoryOfContent } from './category-of-content.model';


interface CategoryCreationAttrs {
  param: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  param: string;
  @BelongsToMany(
    () => Content,
    () => CategoryOfContent,
  )
  content: Content[];
}
