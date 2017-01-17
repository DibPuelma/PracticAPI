'use strict';
module.exports = function(sequelize, DataTypes) {
  var SellPoint = sequelize.define('SellPoint', {
    location         : { type: DataTypes.TEXT },
    attended_active  : { type: DataTypes.INTEGER },
    unattended_active: { type: DataTypes.INTEGER }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        SellPoint.hasMany(models.Employee);
        SellPoint.belongsTo(models.Company);
        SellPoint.hasOne(models.QR);
        //SellPoint.hasOne(models.Poll);
      }
    }
  });
  return SellPoint;
};