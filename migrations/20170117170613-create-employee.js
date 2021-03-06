'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Employees', {
      id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      
      name      : { type: Sequelize.STRING },
      last_name : { type: Sequelize.STRING },
      picture   : { type: Sequelize.TEXT },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Employees');
  }
};