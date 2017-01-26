'use strict';
module.exports = function(sequelize, DataTypes) {
  //TODO: eliminar los campos
  var AnsweredPoll = sequelize.define('AnsweredPoll', {
    user_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        AnsweredPoll.belongsTo(models.User);
        AnsweredPoll.belongsTo(models.Employee);
        AnsweredPoll.belongsTo(models.SellPoint);
        AnsweredPoll.hasMany(models.Answer);
        AnsweredPoll.belongsTo(models.Poll);
      }
    }
  });
  return AnsweredPoll;
};
