import { DataTypes } from '@sequelize/core';
import { sequelize } from './sequlize';

const modal = sequelize.define('Vpn', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, { tableName: 'stop_war_vpn', timestamps: true });

export const VpnModal = modal;
