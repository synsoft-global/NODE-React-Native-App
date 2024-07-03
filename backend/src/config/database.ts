import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import 'reflect-metadata';
import path from 'path';
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [path.join(__dirname, '../models')]
});

export { sequelize };
