'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameTable('PosibleOptions', 'PossibleOptions')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameTable('PossibleOptions', 'PosibleOptions')
  }
};
