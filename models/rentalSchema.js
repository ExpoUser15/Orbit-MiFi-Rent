const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const rentalSchema = sequelize.define(
    'tb_rental',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passport: {
        type: DataTypes.STRING,
        allowNull: false
      },
      boarding_passport: {
        type: DataTypes.STRING,
        allowNull: true
      },
      modem: {
        type: DataTypes.STRING,
        allowNull: false
      },
      plan: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Rented', 'Finished', 'In Progress'],
      },
      startAt: {
        type: DataTypes.STRING,
        allowNull: true
      },
      finishAt: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
);

module.exports = rentalSchema;