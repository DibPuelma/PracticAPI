'use strict';
module.exports = function(sequelize, DataTypes) {
  var Contest = sequelize.define('Contest', {
    name      : { type: DataTypes.STRING },
    draw_date : { type: DataTypes.DATE },
    start_date: { type: DataTypes.DATE }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        Contest.belongsTo(models.Company);
        Contest.belongsToMany(models.User, { through: 'UserContest' });
        Contest.hasMany(models.SellPoint);
        Contest.hasMany(models.Prize);
      }
    }
  });
  return Contest;
};
