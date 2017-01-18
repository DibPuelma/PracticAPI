var models = require('../models/'); // UNUSED

var User      = require('../models/').User;
var Company   = require('../models/').Company;
var Employee  = require('../models/').Employee;
var SellPoint = require('../models/').SellPoint;
var QR        = require('../models/').QR;
var Contest   = require('../models/').Contest;
var Prize     = require('../models/').Prize;

var express = require('express')
var router = express.Router()

router.get('/sync', function(req, res) {
  models.sequelize.sync({ force: true }).then(function() {
    console.log("Sync!");
  });
  res.send('Done!');
});

router.get('/create1', function(req, res) {
  // Users
  users_data.forEach(function(data) {
    var user = User.build(data)

    user.save().then(function() {
      console.log("User saved: " + data.email);
    }).catch(function(error) {
      console.log("Error: " + error);
    });
  });

  // Companies
  Company.destroy({where: {}}).then(function () {console.log("Clean companies table")});
  companies_data.forEach(function(data) {
    var company = Company.build(data)

    company.save().then(function() {
      console.log("Company saved: " + company.name);
    }).catch(function(error) {
      console.log("Error: " + error);
    });
  });

  res.send('Done!');
});

router.get('/create2', function(req, res) {
  // Employees
  Employee.destroy({where: {}}).then(function () {console.log("Clean employees table")});
  employees_data.forEach(function(data) {
    var employee = Employee.build(data.info)
    
    Company.findOne({
      where: { name: data.company }
    }).then(function(company) {
      employee.save().then(function() {
        employee.setCompany(company);
        console.log("Employee saved: " + data.info.name);
      }).catch(function(error) {
        console.log("Error: " + error);
      });
    });
  });

  // SellPoints
  SellPoint.destroy({where: {}}).then(function () {console.log("Clean sellpoint table")});
  sellpoints_data.forEach(function(data) {
    var sellpoint = SellPoint.build(data.info);
    
    Company.findOne({
      where: { name: data.company }
    }).then(function(company) {
      sellpoint.save().then(function() {
        sellpoint.setCompany(company);
        console.log("SellPoint saved: " + data.info.name);
      }).catch(function(error) {
        console.log("Error: " + error);
      });
    });
  });

  // QRs
  QR.destroy({where: {}}).then(function () {console.log("Clean QRs table")});
  qr_data.forEach(function(data) {
    var qr = QR.build(data.info);

    qr.save().then(function() {
      console.log("QR saved: " + data.info.code);
    }).catch(function(error) {
      console.log("Error: " + error);
    });
  });

  // Contests
  Contest.destroy({where: {}}).then(function () {console.log("Clean Contest table")});
  contest_data.forEach(function(data) {
    var contest = Contest.build(data.info);

    Company.findOne({
      where: { name: data.company }
    }).then(function(company) {
      contest.save().then(function() {
        contest.setCompany(company);
        console.log("Contest saved: " + data.info.name);
      }).catch(function(error) {
        console.log("Error: " + error);
      });
    });
  });

  // Prizes
  Prize.destroy({where: {}}).then(function () {console.log("Clean Prize table")});
  prize_data.forEach(function(data) {
    var prize = Prize.build(data.info);

    prize.save().then(function() {
      console.log("Prize saved: " + data.info.name);
    }).catch(function(error) {
      console.log("Error: " + error);
    });
  });

  res.send('Done!');
});

router.get('/connect', function(req, res) {
  // Assign employees to sellpoints
  employees_data.forEach(function(data) {
    Employee.findOne({
      where: { name: data.info.name}
    }).then(function (employee) {
      SellPoint.findOne({
        where: { location: data.sellpoint }
      }).then(function(sellpoint) {
        employee.setSellPoint(sellpoint);
        console.log("Employee updated");
      });
    });
  });

  // Assign qr to sellpoints
  qr_data.forEach(function(data) {
    QR.findOne({
      where: { name: data.info.code}
    }).then(function (qr) {
      SellPoint.findOne({
        where: { location: data.sellpoint }
      }).then(function(sellpoint) {
        qr.setSellpoint(sellpoint);
        console.log("QR updated");
      });
    });
  });

  // Assign prizes to contest
  prize_data.forEach(function(data) {
    Prize.findOne({
      where: { name: data.info.name}
    }).then(function (prize) {
      Contest.findOne({
        where: { name: data.contest }
      }).then(function(contest) {
        prize.setContest(contest);
        console.log("Prize updated");
      });
    });
  });

  res.send('Connect!');
});

router.get('/hello', function(req, res) {
  res.send('Hello world!');
});

router.get('/test', function(req, res) {
  Employee.findOne({
    where: {name: employees_data[0].info.name}
  }).then(function(employee) {
    console.log(employee.company);
  });
  res.send('Done!');
});



module.exports = router;


var users_data = [
  { 
    email         : 'user1@abc.net',
    first_name    : 'User1',
    last_name     : 'LastName1',
    birthdate     : '1990-01-01',
    gender        : 'm',
    facebook_id   : '',
    facebook_token: '',
    password      : '123',
    reset_hash    : '',
    status        : 'active'
  }, { 
    email         : 'user2@abc.net',
    first_name    : 'User2',
    last_name     : 'LastName2',
    birthdate     : '1990-01-01',
    gender        : 'm',
    facebook_id   : '',
    facebook_token: '',
    password      : '123',
    reset_hash    : '',
    status        : 'active'
  }, {
    email         : 'user3@abc.net',
    first_name    : 'User3',
    last_name     : 'LastName3',
    birthdate     : '1990-01-01',
    gender        : 'm',
    facebook_id   : '',
    facebook_token: '',
    password      : '123',
    reset_hash    : '',
    status        : 'active'
  }
];

var companies_data = [
  {
    name: 'Company1',
    email: 'company1@abc.com'
  }, {
    name: 'Company2',
    email: 'company2@abc.com'
  }
];

var employees_data = [
  {
    company: 'Company1',
    sellpoint: 'Local1',
    info: {    
      name      : 'Employee1',
      last_name : 'E',
      picture   : ''
    }
  }, {
    company: 'Company1',
    sellpoint: 'Local2',
    info: {
      name      : 'Employee2',
      last_name : 'E',
      picture   : ''
    }
  }, {
    company: 'Company2',
    sellpoint: 'Local Norte',
    info: {
      name      : 'Empleado1',
      last_name : 'E',
      picture   : ''
    }
  }, {
    company: 'Company2',
    sellpoint: 'Local Norte',
    info: {
      name      : 'Empleado2',
      last_name : 'E',
      picture   : ''
    }
  }, {
    company: 'Company2',
    sellpoint: 'Local Sur',
    info: {
      name      : 'Empleado3',
      last_name : 'E',
      picture   : ''
    }
  }
];


var sellpoints_data = [
  {
    company: 'Company1',
    info: {
      location : 'Local1'
    }
  }, {
    company: 'Company1',
    info: {
      location : 'Local2'
    }
  }, {
    company: 'Company2',
    info: {
      location : 'Local Norte'
    }
  }, {
    company: 'Company2',
    info: {
      location : 'Local Sur'
    }
  }
];

var qr_data = [
  {
    info: { code: 'code1' },
    sellpoint: 'Local1'
  }, {
    info: { code: 'code2' },
    sellpoint: 'Local2'
  }, {
    info: { code: 'code3' },
    sellpoint: 'Local Norte'
  }, {
    info: { code: 'code4' },
    sellpoint: 'Local Sur'
  }
]

var cur = new Date(), after30days = cur.setDate(cur.getDate() + 30);
var contest_data = [
  {
    company: 'Company1',
    info: {
      name      : 'Contest 1',
      draw_date : after30days,
      start_date: cur
    }
  }, {
    company: 'Company2',
    info: {
      name      : 'Concurso 1',
      draw_date : after30days,
      start_date: cur
    }
  }, {
    company: 'Company2',
    info: {
      name      : 'Concurso 2',
      draw_date : after30days,
      start_date: cur
    }
  }
]

var prize_data = [
  {
    contest: 'Contest 1',
    info: {
      name       : '100 Oro',
      description: 'Oro de parte del rey'
    }
  }, {
    contest: 'Contest 1',
    info: {
      name       : '200 Oro',
      description: 'Oro de parte del rey'
    }
  }, {
    contest: 'Contest 1',
    info: {
      name       : '300 Oro',
      description: 'Oro de parte del rey'
    }
  }, {
    contest: 'Concurso 1',
    info: {
      name       : 'Espada de Fuego',
      description: 'Legendaria espada encontrada en el bosque'
    }
  }, {
    contest: 'Concurso 2',
    info: {
      name       : 'Mouse Gamer',
      description: 'Legendario mouse encontrado en el bosque'
    }
  }
]



