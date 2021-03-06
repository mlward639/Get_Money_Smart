const User = require('./user');
const Checking = require('./checking');
const Saving = require('./saving');
const Credit = require('./credit');
const History = require('./history');

User.hasOne(Checking, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Checking.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasOne(Saving, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Saving.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasOne(Credit, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Credit.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasOne(History, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

History.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(History, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { Saving, Checking, Credit, History, User };
