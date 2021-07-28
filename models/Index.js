const User = require('./User');
const Account = require('./Account');
const Credit = require('./Credit')

User.hasMany(Account, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Account.belongsTo(User, {
  foreignKey: 'user_id'
});

Credit.belongsTo(User, {
  foreignKey: 'user_id'
})



module.exports = { User, Account, Credit };