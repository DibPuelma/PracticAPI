'use strict';
module.exports = function(sequelize, DataTypes) {
  var PollQuestions = sequelize.define('PollQuestions', {
    question_id: DataTypes.INTEGER,
    poll_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PollQuestions;
};
