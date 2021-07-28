const User = require('./User');
const Checking = require('./Checking');
const Saving = require('./Saving');
const Credit = require('./Credit')

User.hasOne(Checking, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Checking.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(Saving, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Saving.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(Credit, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Credit.belongsTo(User, {
  foreignKey: 'user_id'
})



module.exports = { Saving, Checking, Credit, User};