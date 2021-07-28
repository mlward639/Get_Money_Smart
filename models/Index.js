const User = require('./User');
const Checking = require('./Checking');
const Saving = require('./Saving');
const Credit = require('./Credit')


Checking.belongsTo(User, {
  foreignKey: 'user_id'
});

Saving.belongsTo(User, {
  foreignKey: 'user_id'
});

Credit.belongsTo(User, {
  foreignKey: 'user_id'
})



module.exports = { Saving, Checking, Credit, User};