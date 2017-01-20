'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Polls', 'createdAt', 'created_at')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('Polls', 'created_at', 'createdAt')
  }
};
