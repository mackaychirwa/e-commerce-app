'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
          references: {
            model: "categories",
            key: "id",
        },
      },
      
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'image_url'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'updated_at'
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at'
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  },
};
