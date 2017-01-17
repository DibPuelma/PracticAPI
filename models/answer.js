'use strict';
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define('Answer', {
    string_value: DataTypes.STRING,
    number_value: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Answer.hasOne(models.PosibleOption);
        Answer.belongsTo(models.Question);
        Answer.belongsTo(models.User);
      }
    }
  });
  return Answer;
};
