'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('SellPoints', {
      id               : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      
      location         : { type: Sequelize.TEXT },
      attended_active  : { type: Sequelize.INTEGER },
      unattended_active: { type: Sequelize.INTEGER },
      
      created_at       : { allowNull: false, type: Sequelize.DATE },
      updated_at       : { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('SellPoints');
  }
};