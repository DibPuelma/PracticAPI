var excel = require('node-excel-export');

var styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};

//Here you specify the export structure
module.exports.specification = {
  sellpoint_id: {
    displayName: 'ID punto de venta',
    headerStyle: styles.headerDark,
    width: '12'
  },
  sellpoint_name: {
    displayName: 'Local',
    headerStyle: styles.headerDark,
    width: '20'
  },
  question_id: {
    displayName: 'ID pregunta',
    headerStyle: styles.headerDark,
    width: '12'
  },
  question_text: {
    displayName: 'Pregunta',
    headerStyle: styles.headerDark,
    width: '50'
  },
  question_type: {
    displayName: 'Tipo',
    headerStyle: styles.headerDark,
    width: '10'
  },
  answer_id: {
    displayName: 'ID respuesta',
    headerStyle: styles.headerDark,
    width: '13'
  },
  value: {
    displayName: 'Respuesta',
    headerStyle: styles.headerDark,
    width: '50'
  },
  user_id: {
    displayName: 'ID usuario',
    headerStyle: styles.headerDark,
    width: '11'
  },
  user_age: {
    displayName: 'Edad',
    headerStyle: styles.headerDark,
    width: '5'
  },
  user_gender: {
    displayName: 'Género',
    headerStyle: styles.headerDark,
    width: '7'
  }
}
