'use strict';
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define('Company', {
    name : { type: DataTypes.STRING },
    email: { type: DataTypes.TEXT }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Company.hasMany(models.Employee);
        Company.hasMany(models.Contest);
        Company.hasMany(models.SellPoint);
        Company.hasMany(models.Poll);
        Company.hasMany(models.OptionsContainer);
        Company.hasMany(models.Question);
        Company.hasMany(models.PossibleOption)
      }
    }
  });
  return Company;
};
