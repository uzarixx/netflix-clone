import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Users } from 'src/users/users.model';


interface AccountsCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'accounts' })
export class Accounts extends Model<Accounts, AccountsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @HasMany(() => Users)
  users: Users[];
}
