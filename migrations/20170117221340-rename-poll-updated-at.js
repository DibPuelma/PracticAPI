'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Polls', 'updatedAt', 'updated_at')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Polls', 'updated_at', 'updatedAt')
  }
};
