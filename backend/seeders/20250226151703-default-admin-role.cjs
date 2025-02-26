'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        description: 'Administrator role with full access',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'customer',
        description: 'customer role with minimal access',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', { name: 'admin' });
  },
};
