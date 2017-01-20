'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    text: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Question.hasOne(models.OptionsContainer);
        Question.hasMany(models.Answer);
        Question.belongsToMany(models.Poll, {through: 'PollQuestion'});
      }
    }
  });
  return Question;
};
