'use strict';
module.exports = function(sequelize, DataTypes) {
  var SellPointEmployees = sequelize.define('SellPointEmployees', {
    sell_point_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SellPointEmployees;
};
