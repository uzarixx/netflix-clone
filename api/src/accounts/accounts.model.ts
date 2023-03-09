import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Tokens } from 'src/token/token.model';
import { Users } from 'src/users/users.model';


interface AccountsCreationAttrs {
  email: string;
  password: string;
  isVerify?: boolean;
}

@Table({ tableName: 'accounts' })
export class Accounts extends Model<Accounts, AccountsCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerify: boolean;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  twoFactor: boolean;
  @HasMany(() => Users)
  users: Users[];
  @HasMany(() => Tokens)
  tokens: Tokens[];
}
