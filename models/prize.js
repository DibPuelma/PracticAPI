'use strict';
module.exports = function(sequelize, DataTypes) {
  var Prize = sequelize.define('Prize', {
    name       : { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    code       : { type: DataTypes.TEXT }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Prize.belongsTo(models.Contest);
        Prize.hasOne(models.User);
      }
    }
  });
  return Prize;
};
