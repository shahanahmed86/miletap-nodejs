const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const configs = require('../../config/app')

const env = configs.app.env;
const dbConfig = require('../../config/db.js');

const config = dbConfig[env];

const sequelize = new Sequelize(config);

const models = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1 &&
      file.indexOf('helper.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (!models[modelName].associate) return;
  
  models[modelName].associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
