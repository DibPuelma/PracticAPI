'use strict';
module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define('Manager', {
    email         : { type: DataTypes.TEXT },
    first_name    : { type: DataTypes.STRING },
    last_name     : { type: DataTypes.STRING },
    password      : { type: DataTypes.TEXT },
    is_super_user : { type: DataTypes.BOOLEAN }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Manager.belongsTo(models.Company);
      }
    }
  });
  return Manager;
};
