'use strict';
module.exports = function(sequelize, DataTypes) {
  var SellPoint = sequelize.define('SellPoint', {
    location         : { type: DataTypes.TEXT },
    attended_active  : { type: DataTypes.INTEGER },
    unattended_active: { type: DataTypes.INTEGER },
    code: { type: DataTypes.TEXT }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['code']
      }
    ]
    underscored: true,
    classMethods: {
      associate: function(models) {
        SellPoint.belongsToMany(models.Employee, {through: 'SellPointEmployees'});
        SellPoint.belongsTo(models.Company);
        SellPoint.belongsTo(models.Poll, {as: "AttendedPoll"});
        SellPoint.belongsTo(models.Poll, {as: "UnattendedPoll"});
        SellPoint.hasMany(models.AnsweredPoll);
        SellPoint.belongsTo(models.Contest);
      }
    }
  });
  return SellPoint;
};
