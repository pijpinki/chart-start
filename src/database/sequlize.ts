import { DataTypes, Sequelize } from '@sequelize/core';
import config from '../config';
import { TYPES } from '../constants';

const { user, password, host, port, database } = config.database;

const sequelize = new Sequelize(
  `mysql://${user}:${password}@${host}:${port}/${database}`
) // Example for postgres

const stats = sequelize.define('Stats', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM(...Object.values(TYPES)),
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, { tableName: 'stats' });

export const statsModal = stats;
