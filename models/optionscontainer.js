'use strict';
module.exports = function(sequelize, DataTypes) {
  var OptionsContainer = sequelize.define('OptionsContainer', {
    name: DataTypes.STRING,
    allow_other: DataTypes.BOOLEAN
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        OptionsContainer.belongsToMany(models.PosibleOption, {through: 'OptionsContainerPosibleOptions'});
      }
    }
  });
  return OptionsContainer;
};
