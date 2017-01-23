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
        Contest.hasMany(models.User);

        Contest.belongsToMany(models.User, { through: 'UserContest' });
      }
    }
  });
  return Contest;
};
