'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email         : { type: DataTypes.TEXT },
    first_name    : { type: DataTypes.STRING },
    last_name     : { type: DataTypes.STRING },
    birthdate     : { type: DataTypes.DATE },
    gender        : { type: DataTypes.STRING },
    facebook_id   : { type: DataTypes.TEXT },
    facebook_token: { type: DataTypes.TEXT },
    password      : { type: DataTypes.TEXT },
    reset_hash    : { type: DataTypes.TEXT },
    status        : { type: DataTypes.TEXT }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        User.hasMany(models.AnsweredPoll);
        User.belongsToMany(models.Contest, { through: 'UserContest' });
        User.hasOne(models.Prize);
      }
    }
  });
  return User;
};
