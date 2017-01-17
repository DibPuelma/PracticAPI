'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Answers', [
      {
        string_value: null,
        number_value: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 5,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: null,
        number_value: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: "La lleva su tienda",
        number_value: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: "Viva España, viva el Rey, viva el orden y la ley",
        number_value: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        string_value: "No se que poner",
        number_value: null,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Answers', [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      }
    ], {});
  }
};
