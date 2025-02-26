'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('reviews', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: { 
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "users",
              key: "id",
          },
      },
      product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "products",
              key: "id",
          },
      },
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              min: 1,
              max: 5,
          },
      },
      comment: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reviews');
  },
};
