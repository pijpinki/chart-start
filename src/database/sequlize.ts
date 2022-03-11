import { DataTypes, Sequelize } from '@sequelize/core';
import config from '../config';
import { TYPES } from '../constants';

const { user, password, host, port, database } = config.database;

export const sequelize = new Sequelize(
  `mysql://${user}:${password}@${host}:${port}/${database}`
);
