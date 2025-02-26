'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("reviews", "review_state", {
      allowNull: true,
      type: Sequelize.INTEGER,
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("reviews", "review_state");
  },
};
