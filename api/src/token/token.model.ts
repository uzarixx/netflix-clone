import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Accounts } from '../accounts/accounts.model';


interface TokensCreationAttrs {
  token: string;
  userId: number;
  isVerify?: boolean;
  expiresAt: string | number;
}

@Table({ tableName: 'tokens' })
export class Tokens extends Model<Tokens, TokensCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @ForeignKey(() => Accounts)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @Column({ type: DataType.STRING })
  token: string;
  @Column({ type: DataType.STRING })
  expiresAt: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isVerify: boolean;
}
