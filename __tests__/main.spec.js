const expressApp = require('../src/app');
const { sequelize } = require('../src/sequelize/models');
const { app } = require('./helper');

before(async () => {
	await sequelize.authenticate();
	await expressApp(app);
});
