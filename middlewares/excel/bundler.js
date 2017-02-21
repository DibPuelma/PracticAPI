var excel = require('node-excel-export');

var specifications = {
  employee: require('./employee.js').specification,
  poll: require('./poll.js').specification,
  question: require('./question.js').specification,
  sellpoint: require('./sellpoint.js').specification,
  all: require('./all.js').specification
}

var names = {
  employee: 'Respuestas sobre todos los empleados',
  poll: 'Respuestas para todas las encuestas',
  question: 'Respuestas para todas las preguntas',
  sellpoint: 'Respuestas sobre todos los puntos de ventas',
  all: 'Respuestas sobre la empresa'
}

module.exports.buildExcel = function(dataset, model) {
  return excel.buildExport(
    [
      {
        name: names[model],
        specification: specifications[model],
        data: dataset
      }
    ]
  )
}
