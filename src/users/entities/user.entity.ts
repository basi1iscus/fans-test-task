import { Exclude } from 'class-transformer';
import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  email: string;

  @Column
  @Exclude()
  password: string;

  @Column
  name: string;

  @Column
  phone: string;
}
