import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './User';

@Table({
  timestamps: true,
  tableName: 'movies'
})
export class Movie extends Model<Movie> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  publishingYear!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  image!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
