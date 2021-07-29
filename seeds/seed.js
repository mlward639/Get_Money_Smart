const sequelize = require("../config/connection");
const { User, Checking, Saving, Credit } = require("../models");

const userData = require("./userData.json");
const savingData = require("./savingData.json");
const checkingData = require("./checkingData.json");
const creditData = require("./creditData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const saving of savingData) {
    await Saving.create({
      ...saving
    });
  }

  for (const checking of checkingData) {
    await Checking.create({
      ...checking
  })
}

  for (const credit of creditData) {
    await Credit.create({
      ...credit
    });
  }

  process.exit(0);
};

seedDatabase();
