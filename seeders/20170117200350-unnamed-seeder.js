'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Questions', [
      {
        text: '¿El vendedor lo trató con respeto?',
        type: 'number',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        text: '¿El vendedor conocía los productos?',
        type: 'number',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        text: '¿El vendedor estuvo atento a sus necesidades?',
        type: 'number',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        text: 'Si quiere puede dejarnos un comentario',
        type: 'string',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Questions', [
      {
        text: '¿El vendedor lo trató con respeto?'
      },
      {
        text: '¿El vendedor conocía los productos?'
      },
      {
        text: '¿El vendedor estuvo atento a sus necesidades?'
      },
      {
        text: 'Si quiere puede dejarnos un comentario'
      }
    ], {});
  }
};
