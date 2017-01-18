'use strict';
module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define('Poll', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Poll.belongsToMany(models.Question, {through: 'PollQuestions'});
        // Poll.belongsTo(models.Company);
        // Poll.belongsTo(models.SellPoint);
        Poll.hasMany(models.AnsweredPoll);
      }
    }
  });
  return Poll;
};
