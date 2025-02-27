'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the admin role id from the roles table
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'admin'"
    );

    const hashedPassword = await bcrypt.hash('password', 10);

    // Insert the default admin user
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@tushop.com',
        password: hashedPassword, 
        username: 'Admin User',
        phoneNumber: '0881315201',
        address: 'Blantyre',
        city: 'Blantyre',
        country: 'Malawi',
        role_id: adminRole[0].id, 
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@tushop.com' });
  }
};
