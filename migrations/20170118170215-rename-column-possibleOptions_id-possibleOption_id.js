'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('OptionsContainerPossibleOptions', 'possibleOptions_id', 'possibleOption_id')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('OptionsContainerPossibleOptions', 'possibleOption_id', 'possibleOptions_id')
  }
};
