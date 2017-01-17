'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Contests', {
      id        : { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },

      name      : { type: Sequelize.STRING },
      draw_date : { type: Sequelize.DATE },
      start_date: { type: Sequelize.DATE },

      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Contests');
  }
};