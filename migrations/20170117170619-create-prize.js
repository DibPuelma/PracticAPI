'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Prizes', {
      id         : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      
      name       : { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      winner     : { type: Sequelize.INTEGER },
      
      created_at : { allowNull: false, type: Sequelize.DATE },
      updated_at : { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Prizes');
  }
};