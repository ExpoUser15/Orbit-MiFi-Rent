const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const readyStoksSchema = sequelize.define(
    'tb_ready_stok',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      n1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      n2: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
);

module.exports = readyStoksSchema;