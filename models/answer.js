'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    string_value: DataTypes.STRING,
    number_value: DataTypes.INTEGER,
    boolean_value: DataTypes.BOOLEAN
  }, {
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        Answer.belongsTo(models.PossibleOption);
        Answer.belongsTo(models.Question);
        Answer.belongsTo(models.AnsweredPoll);
      }
    }
  });
  return Answer;
};
