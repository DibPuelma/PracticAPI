'use strict';
module.exports = function(sequelize, DataTypes) {
  var PosibleOption = sequelize.define('PosibleOption', {
    value: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        PosibleOption.belongsToMany(models.OptionsContainer, {through: 'OptionsContainerPosibleOptions'});
      }
    }
  });
  return PosibleOption;
};
