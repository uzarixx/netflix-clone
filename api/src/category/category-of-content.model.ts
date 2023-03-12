import {
  Column,
  DataType, ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Content } from '../content/content.model';
import { Category } from './category.model';


interface CategoryOfContentAttrs {
  contentId: number;
  categoryId: number;
}

@Table({ tableName: 'category_of_content' })
export class CategoryOfContent extends Model<CategoryOfContent, CategoryOfContentAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Content)
  @Column({ type: DataType.INTEGER })
  contentId: number;
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;


}
