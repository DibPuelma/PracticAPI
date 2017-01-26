'use strict';
module.exports = function(sequelize, DataTypes) {
  var OptionsContainerPossibleOptions = sequelize.define('OptionsContainerPossibleOptions', {
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
