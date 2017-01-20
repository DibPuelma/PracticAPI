'use strict';
module.exports = function(sequelize, DataTypes) {
  var OptionsContainerPossibleOptions = sequelize.define('OptionsContainerPossibleOptions', {
    optionsContainer_id: DataTypes.INTEGER,
    possibleOptions_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return OptionsContainerPossibleOptions;
};