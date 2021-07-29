const sequelize = require("../config/connection");
const { Account, Credit, User } = require("../models");
const { v4: uuidv4 } = require("uuid");

const accountData = require("./accountData.json");
const creditData = require("./creditData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const account of accountData) {
    await Account.create({
      ...account,
      account_number: uuidv4(),
    });
  }
  for (const credit of creditData) {
    await Credit.create({
      ...credit,
      account_number: uuidv4(),
    });
  }
  process.exit(0);
};

seedDatabase();
