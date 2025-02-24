const { sequelize } = require('../../config/database');
const fs = require('fs');
const path = require('path');

// Load models dynamically
const models = {};
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    models[model.name] = model;
  });

// Run associations if defined
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Export models and Sequelize instance
models.sequelize = sequelize;
models.Sequelize = require('sequelize');

module.exports = models;