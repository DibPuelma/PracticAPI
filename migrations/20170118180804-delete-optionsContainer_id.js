'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('OptionsContainerPossibleOptions', 'optionsContainer_id')
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn('OptionsContainerPossibleOptions', 'optionsContainer_id', Sequelize.INTEGER)
  }
};
