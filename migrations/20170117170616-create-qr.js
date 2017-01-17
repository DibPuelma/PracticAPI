'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('QRs', {
      id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      
      code      : { type: Sequelize.TEXT },
      
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('QRs');
  }
};