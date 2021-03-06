'use strict';
module.exports = function(sequelize, DataTypes) {
  var PossibleOption = sequelize.define('PossibleOption', {
    value: DataTypes.STRING
  }, {
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        PossibleOption.belongsToMany(models.OptionsContainer, {through: 'OptionsContainerPossibleOptions'});
        PossibleOption.hasMany(models.Answer);
        PossibleOption.belongsTo(models.Company);
      }
    }
  });
  return PossibleOption;
};
