var sequelize = require('./sequelize')
exports.create = function (name, lastName) {
  sequelize.User.sync({force: true}).then(function () {
    // Table created
    return sequelize.User.create({
      firstName: name,
      lastName: lastName
    });
  });
}
