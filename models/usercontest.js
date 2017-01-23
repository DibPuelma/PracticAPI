'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserContest = sequelize.define('UserContest', {
    user_id: DataTypes.INTEGER,
    contest_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserContest;
};