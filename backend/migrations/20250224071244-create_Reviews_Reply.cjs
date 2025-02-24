'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('review_replies', {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        primaryKey: true,
    },
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "reviews", key: "id" },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    reply: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('review_replies');
  },
};
