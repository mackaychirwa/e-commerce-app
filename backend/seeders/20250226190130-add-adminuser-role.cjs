'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch the admin role id from the roles table
    const [adminRole] = await queryInterface.sequelize.query(
      "SELECT id FROM roles WHERE name = 'admin'"
    );

    // Insert the default admin user with role_id = 1 (admin role)
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashedpassword', // You can hash a password or use a library like bcrypt
        role_id: adminRole[0].id, // Assign the admin role id
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete the user with role_id = 1 (admin role)
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' });

    // Optionally, you could delete the 'admin' role if necessary
    // await queryInterface.bulkDelete('roles', { name: 'admin' });
  }
};
