'use strict';
module.exports = function(sequelize, DataTypes) {
  var PosibleOption = sequelize.define('PosibleOption', {
    value: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        PosibleOption.belongsTo(models.OptionsContainer);
      }
    }
  });
  return PosibleOption;
};
