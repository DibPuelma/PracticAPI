'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Answers', 'boolean_value',  {
    type: Sequelize.STRING
  })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Answers', 'boolean_value')
  }
};
