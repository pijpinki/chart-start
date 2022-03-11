import { DataTypes } from '@sequelize/core';
import { TYPES } from '../constants';
import { sequelize } from './sequlize';

const modal = sequelize.define('Stats', {
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
}, { tableName: 'stop_war_stats', timestamps: false });

export const StatsModal = modal;
