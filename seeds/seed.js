const sequelize = require("../config/connection");
const { User, Checking, Saving, Credit } = require("../models");

const userData = require("./userData.json");
const savingData = require("./savingData.json");
const checkingData = require("./checkingData.json");
const creditData = require("./creditData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const saving of savingData) {
    await Saving.create({
      ...saving,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const checking of checkingData) {
    await Checking.create({
      ...checking,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const credit of creditData) {
    await Credit.create({
      ...credit,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
