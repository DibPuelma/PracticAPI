'use strict';
module.exports = function(sequelize, DataTypes) {
  var QR = sequelize.define('QR', {
    code: { type: DataTypes.TEXT }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        QR.belongsTo(models.SellPoint);
      }
    }
  });
  return QR;
};