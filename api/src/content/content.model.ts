import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany, HasMany,
} from 'sequelize-typescript';
import { Category } from 'src/category/category.model';
import { CategoryOfContent } from 'src/category/category-of-content.model';
import { Seasons } from '../series/seasons.model';
import { Films } from '../films/films.model';


interface FilmsCreationAttrs {
  name: string;
  description: string;
  publicationDate: string;
  rating: number;
  previewVideo: string;
  previewImage: string;
  yearCategory: number;
  isFilm: boolean;
}

@Table({ tableName: 'content' })
export class Content extends Model<Content, FilmsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
  @Column({ type: DataType.DATE, allowNull: false })
  publicationDate: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  rating: number;
  @Column({ type: DataType.STRING, allowNull: false })
  previewVideo: string;
  @Column({ type: DataType.STRING, allowNull: false })
  previewImage: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  yearCategory: number;
  @Column({ type: DataType.BOOLEAN })
  isFilm: boolean;
  @BelongsToMany(() => Category, () => CategoryOfContent)
  category: Category[];
  @HasMany(() => Seasons)
  seasons: Seasons[];
  @HasMany(() => Films)
  films: Films[];
}
