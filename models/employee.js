'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name      : { type: DataTypes.STRING },
    last_name : { type: DataTypes.STRING },
    picture   : { type: DataTypes.TEXT }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Employee.belongsTo(models.Company);
        Employee.belongsToMany(models.SellPoint, {through: 'SellPointEmployees'});
        Employee.hasMany(models.AnsweredPoll);
      }
    }
  });
  return Employee;
};
