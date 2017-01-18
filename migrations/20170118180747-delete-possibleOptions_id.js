'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('OptionsContainerPossibleOptions', 'possibleOptions_id')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn('OptionsContainerPossibleOptions', 'possibleOptions_id', Sequelize.INTEGER)
  }
};
