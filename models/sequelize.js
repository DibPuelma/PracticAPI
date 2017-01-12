var Sequelize = require('sequelize')

var sequelize = new Sequelize('postgres://kjexfzan:JLB24D5EeuT-DJvfZdLZWh-6dMFb6kUa@elmer.db.elephantsql.com:5432/kjexfzan');

exports.User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});
