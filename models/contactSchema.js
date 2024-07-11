const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const contactSchema = sequelize.define(
    'tb_contact',
    {
      contact_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
);

module.exports = contactSchema;