'use strict';
module.exports = function(sequelize, DataTypes) {
  var Prize = sequelize.define('Prize', {
    name       : { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    winner     : { type: DataTypes.INTEGER }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Prize.belongsTo(models.Contest);
      }
    }
  });
  return Prize;
};