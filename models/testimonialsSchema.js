const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const testimonialsSchema = sequelize.define(
    'tb_testimonial',
    {
      testimonial_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      testimonial: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      text: {
        type: DataTypes.INTEGER,
        allowNull: false
      },      
      createdAt: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
);

module.exports = testimonialsSchema;