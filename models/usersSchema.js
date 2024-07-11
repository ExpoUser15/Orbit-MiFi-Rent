const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const usersSchema = sequelize.define(
    'tb_user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_level: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
);

module.exports = usersSchema;