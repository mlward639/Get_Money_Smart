const sequelize = require('../config/connection');
const { User, Checking, History, Saving, Credit } = require('../models');

const userData = require('./userData.json');
const savingData = require('./savingData.json');
const checkingData = require('./checkingData.json');
const creditData = require('./creditData.json');
const historyData = require('./historyData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const checking of checkingData) {
    await Checking.create({
      ...checking,
    });
  }

  for (const saving of savingData) {
    await Saving.create({
      ...saving,
    });
  }

  for (const credit of creditData) {
    await Credit.create({
      ...credit,
    });
  }

  for (const history of historyData) {
    await History.create({
      ...history,
    });
  }

  process.exit(0);
};

seedDatabase();
