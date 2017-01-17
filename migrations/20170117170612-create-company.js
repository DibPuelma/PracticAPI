'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Companies', {
      id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      
      name      : { type: Sequelize.STRING },
      email     : { type: Sequelize.TEXT },
      
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Companies');
  }
};