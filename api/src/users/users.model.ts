import {
  Column,
  DataType,
  Model,
  Table,
  HasMany, ForeignKey,
} from 'sequelize-typescript';
import { Accounts } from '../accounts/accounts.model';


interface UserCreationAttrs {
  accountId: number;
  username: string;
  avatar: string;
  pin: number | null;
  isPin: boolean;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Accounts)
  @Column({ type: DataType.INTEGER })
  accountId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;
  @Column({ type: DataType.STRING, defaultValue: '' })
  avatar: string;
  @Column({ type: DataType.INTEGER, defaultValue: null })
  pin: number;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isPin: boolean;
}
