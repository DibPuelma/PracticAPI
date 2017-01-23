'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    text: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Question.belongsTo(models.OptionsContainer);
        Question.hasMany(models.Answer);
        Question.belongsToMany(models.Poll, {through: 'PollQuestion'});
        Question.belongsTo(models.Company);
      }
    }
  });
  return Question;
};
