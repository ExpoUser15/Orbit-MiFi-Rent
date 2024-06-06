const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const stokSchema = sequelize.define(
    'tb_stok',
    {
      modem_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      jenis_modem: {
        type: DataTypes.STRING,
        allowNull: false
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
);

module.exports = stokSchema;