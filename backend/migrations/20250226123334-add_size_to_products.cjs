'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("products", "size", {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2),
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("products", "size");
  },
};