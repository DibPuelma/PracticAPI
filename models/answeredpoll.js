'use strict';
module.exports = function(sequelize, DataTypes) {
  var AnsweredPoll = sequelize.define('AnsweredPoll', {
    sellPoint_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        AnsweredPoll.belongsTo(models.User);
        AnsweredPoll.hasOne(models.Employee);
        AnsweredPoll.hasOne(models.SellPoint);
        AnsweredPoll.hasMany(models.Answer);
        AnsweredPoll.belongsTo(models.Poll);
      }
    }
  });
  return AnsweredPoll;
};
