'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id            : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },

      email         : { type: Sequelize.TEXT },
      first_name    : { type: Sequelize.STRING },
      last_name     : { type: Sequelize.STRING },
      birthdate     : { type: Sequelize.DATE },
      gender        : { type: Sequelize.STRING },
      facebook_id   : { type: Sequelize.TEXT },
      facebook_token: { type: Sequelize.TEXT },
      password      : { type: Sequelize.TEXT },
      reset_hash    : { type: Sequelize.TEXT },
      status        : { type: Sequelize.TEXT },

      created_at    : { allowNull: false, type: Sequelize.DATE },
      updated_at    : { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};