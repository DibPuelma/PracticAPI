var Inde = require('../models/index.js');

var optionsArray1 = ["Pescado", "Lasagna", "Cangrejo", "Fideos", "Filete", "Lomo", "Pollo"];
var optionsArray2 = ["Rojo", "Azul", "Verde", "Amarillo", "Morado"];
var optionsArray3 = ["Rock", "Pop", "Jazz", "Electrónica", "Country"];

var optionsObjectFood = [];
var optionsObjectColor = [];
var optionsObjectMusic = [];
var users = [];

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
    email: 'company1@abc.com',
    logo: 'https://medwhat.com/wp-content/uploads/2016/02/Microsoft-Logo-3-832x1024.jpg'
  }, {
    name: 'Company2',
    email: 'company2@abc.com',
    logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201612230124'
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

var cur = new Date()
var after30days = cur.setDate(cur.getDate() + 30);
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
      description: 'Oro de parte del rey',
      code       : '12345'
    }
  }, {
    contest: 'Contest 1',
    info: {
      name       : '200 Oro',
      description: 'Oro de parte del rey',
      code       : '67890'
    }
  }, {
    contest: 'Contest 1',
    info: {
      name       : '300 Oro',
      description: 'Oro de parte del rey',
      code       : 'abcde'
    }
  }, {
    contest: 'Concurso 1',
    info: {
      name       : 'Espada de Fuego',
      description: 'Legendaria espada encontrada en el bosque',
      code       : '192kd0'
    }
  }, {
    contest: 'Concurso 2',
    info: {
      name       : 'Mouse Gamer',
      description: 'Legendario mouse encontrado en el bosque',
      code       : '09sajc09a'
    }
  }
]

var dropTables = function() {
  /*Inde.sequelize.sync({ force: true }).then(function() {
    createTables();
  });
  return;*/

  Inde.PollQuestion.drop().then(function() {
    Inde.OptionsContainerPossibleOptions.drop().then(function() {
      Inde.UserContest.drop().then(function() {
        Inde.Answer.drop().then(function() {
          Inde.PossibleOption.drop().then(function() {
            Inde.Question.drop().then(function() {
              Inde.OptionsContainer.drop().then(function() {
                Inde.AnsweredPoll.drop().then(function() {
                  Inde.User.drop().then(function() {
                    Inde.Employee.drop().then(function() {
                      Inde.QR.drop().then(function() {
                        Inde.SellPoint.drop().then(function() {
                          Inde.Poll.drop().then(function() {
                            Inde.Prize.drop().then(function() {
                              Inde.Contest.drop().then(function() {
                                Inde.Company.drop().then(function() {
                                  createTables();
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}
dropTables();


var createTables = function() {
  Inde.Company.sync().then(function() {
    Inde.Contest.sync().then(function() {
      Inde.Prize.sync().then(function() {
        Inde.Poll.sync().then(function() {
          Inde.SellPoint.sync().then(function() {
            Inde.QR.sync().then(function() {
              Inde.Employee.sync().then(function() {
                Inde.User.sync().then(function() {
                  Inde.AnsweredPoll.sync().then(function() {
                    Inde.OptionsContainer.sync().then(function() {
                      Inde.Question.sync().then(function() {
                        Inde.PossibleOption.sync().then(function() {
                          Inde.Answer.sync().then(function() {
                            Inde.UserContest.sync().then(function() {
                              Inde.OptionsContainerPossibleOptions.sync().then(function() {
                                Inde.PollQuestion.sync().then(function() {
                                  createFranco();
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}

var createFranco = function() {
  console.log("PART 1 - COMPANY & USER #############################");

  // Users
  user_and_companies_promises = [];
  users_data.forEach(function(data) {
    var user = Inde.User.build(data)

    var p = user.save().then(function() {
      console.log("User saved: " + data.email);
    }).catch(function(error) {
      console.log("Error: " + error);
    });

    user_and_companies_promises.push(p);
  });

  // Companies
  companies_data.forEach(function(data) {
    var company = Inde.Company.build(data)

    var p = company.save().then(function() {
      console.log("Company saved: " + company.name);
    }).catch(function(error) {
      console.log("Error: " + error);
    });

    user_and_companies_promises.push(p);
  });


  Promise.all(user_and_companies_promises).then(function() {
    console.log("PART 2 - OTHER MODELS #############################");
    other_models_promises = [];

    // Employees
    employees_data.forEach(function(data) {
      var employee = Inde.Employee.build(data.info)

      Inde.Company.findOne({
        where: { name: data.company }
      }).then(function(company) {
        var p = employee.save().then(function() {
          employee.setCompany(company);
          console.log("Employee saved: " + data.info.name);
        }).catch(function(error) {
          console.log("Error: " + error);
        });
        other_models_promises.push(p);
      });
    });

    // SellPoints
    sellpoints_data.forEach(function(data) {
      var sellpoint = Inde.SellPoint.build(data.info);

      Inde.Company.findOne({
        where: { name: data.company }
      }).then(function(company) {
        var p = sellpoint.save().then(function() {
          sellpoint.setCompany(company);
          console.log("SellPoint saved: " + data.info.location);
        }).catch(function(error) {
          console.log("Error: " + error);
        });
        other_models_promises.push(p);
      });
    });

    // QRs
    qr_data.forEach(function(data) {
      var qr = Inde.QR.build(data.info);

      var p = qr.save().then(function() {
        console.log("QR saved: " + data.info.code);
      }).catch(function(error) {
        console.log("Error: " + error);
      });
      other_models_promises.push(p);
    });

    // Contests
    contest_data.forEach(function(data) {
      var contest = Inde.Contest.build(data.info);
      Inde.Company.findOne({
        where: { name: data.company }
      }).then(function(company) {
        var p = contest.save().then(function() {
          contest.setCompany(company);
          console.log("Contest saved: " + data.info.name);
        }).catch(function(error) {
          console.log("Error: " + error);
        });
        other_models_promises.push(p);
      });
    });

    // Prizes
    prize_data.forEach(function(data) {
      var prize = Inde.Prize.build(data.info);

      var p = prize.save().then(function() {
        console.log("Prize saved: " + data.info.name);
      }).catch(function(error) {
        console.log("Error: " + error);
      });
      other_models_promises.push(p);
    });

    Promise.all(other_models_promises).then(function() {
      console.log("PART 3 - ASSIGN #############################");
      // Assign employees to sellpoints
      employees_data.forEach(function(data) {
        Inde.Employee.findOne({
          where: { name: data.info.name}
        }).then(function (employee) {
          Inde.SellPoint.findOne({
            where: { location: data.sellpoint }
          }).then(function(sellpoint) {
            employee.setSellPoint(sellpoint);
            console.log("Employee updated");
          });
        });
      });

      // Assign qr to sellpoints
      qr_data.forEach(function(data) {
        Inde.QR.findOne({
          where: { code: data.info.code}
        }).then(function (qr) {
          Inde.SellPoint.findOne({
            where: { location: data.sellpoint }
          }).then(function(sellpoint) {
            qr.setSellPoint(sellpoint);
            console.log("QR updated");
          });
        });
      });

      // Assign prizes to contest
      prize_data.forEach(function(data) {
        Inde.Prize.findOne({
          where: { name: data.info.name}
        }).then(function (prize) {
          Inde.Contest.findOne({
            where: { name: data.contest }
          }).then(function(contest) {
            prize.setContest(contest);
            console.log("Prize updated");
          });
        });
      });

      // Assign prizes to user
      user_prizes_data.forEach(function (data) {
        Inde.Prize.findOne( { where: { name: data.prize } } ).then(function(prize) {
          Inde.User.findOne( {where: { email: data.user } } ).then(function(user) {
            prize.update({winner: user.id});
          });
        });
      });

      // Assign some contest to users
      user_contest_data.forEach(function(data) {
        Inde.User.findOne( { where: { email: data.user } }).then(function(user) {
          Inde.Contest.findOne( { where: { name: data.contest } } ).then(function(contest) {
            user.addContest(contest);
          });
        });
      });

      // TODO: asignar contest a sellpoint
      // TODO: asignar attended y unattended poll a sellpoint

    });
    createOptions();
  });
}

var user_contest_data = [
  { user: 'user1@abc.net', contest: 'Contest 1' },
  { user: 'user2@abc.net', contest: 'Contest 1' },
  { user: 'user2@abc.net', contest: 'Concurso 1' }
];

var user_prizes_data = [
  { user: 'user2@abc.net', prize: '100 Oro' },
  { user: 'user2@abc.net', prize: '200 Oro' },
  { user: 'user2@abc.net', prize: '300 Oro' },
  { user: 'user2@abc.net', prize: 'Espada de Fuego' }
];

//Creamos usuarios
var createUsers = function() {
  Inde.User.create({
    email: "rperez@gmail.com",
    first_name: "Roberto",
    last_name: "Perez",
    birthdate: Date.now(),
    gender: 'm',
    password: "123123123"
  }).then(function(user){
    users.push(user);
    Inde.User.create({
      email: "jrojas@gmail.com",
      first_name: "Javier",
      last_name: "Rojas",
      birthdate: Date.now(),
      gender: 'm',
      password: "321321321"
    }).then(function(user){
      users.push(user);
      Inde.User.create({
        email: "jvenegas@gmail.com",
        first_name: "Julieta",
        last_name: "Venegas",
        birthdate: Date.now(),
        gender: 'f',
        password: "234234234"
      }).then(function(user){
        users.push(user);
        createOptions();
      })
    })
  })
}

//Creamos opciones
var createOptions = function() {
  Inde.OptionsContainer.create({
    name: "Comidas",
    allow_other: true
  }).then(function(oc){
    optionsArray1.map((data) => {
      Inde.PossibleOption.create({
        value: data
      }).then(function(possibleoption){
        oc.addPossibleOption(possibleoption);
        optionsObjectFood.push(possibleoption);
      });
    });
    Inde.OptionsContainer.create({
      name: "Colores",
      allow_other: false
    }).then(function(oc){
      optionsArray2.map((data) => {
        Inde.PossibleOption.create({
          value: data
        }).then(function(possibleoption){
          oc.addPossibleOption(possibleoption);
          optionsObjectFood.push(possibleoption);
        });
      });
      Inde.OptionsContainer.create({
        name: "Géneros Musicales",
        allow_other: true
      }).then(function(oc){
        optionsArray3.map((data) => {
          Inde.PossibleOption.create({
            value: data
          }).then(function(possibleoption){
            oc.addPossibleOption(possibleoption);
            optionsObjectFood.push(possibleoption);
          });
        });
        createQuestions();
      });
    });
  });
}

//Creamos las preguntas
var createQuestions = function() {
  Inde.Question.create({
    text: "¿Cúal es tu comida favorita?",
    type: "options"
  }).then(function (question) {
    Inde.OptionsContainer.findById(1).then(function(oc){
      question.setOptionsContainer(oc);
    })
    Inde.Question.create({
      text: "¿Cúal es tu color favorito?",
      type: "options"
    }).then(function (question) {
      Inde.OptionsContainer.findById(2).then(function(oc){
        question.setOptionsContainer(oc);
      })
      Inde.Question.create({
        text: "¿Cúal es tu género musical favorito?",
        type: "options"
      }).then(function (question) {
        Inde.OptionsContainer.findById(3).then(function(oc){
          question.setOptionsContainer(oc);
        })
        Inde.Question.create({
          text: "Si quieres nos puedes dejar un comentario",
          type: "text"
        }).then(function(question) {
          Inde.Question.create({
            text: "¿Qué nota le pondrías al local?",
            type: "number"
          }).then(function(question) {
            createPolls();
          })
        })
      })
    })
  })
}


//Creamos las encuestas
var createPolls = function() {
  Inde.Poll.create({
    name: "Encuesta de comida",
    description: "Queremos saber la comida favorita de la gente"
  }).then(function(poll){
    Inde.Question.findById(1).then(function(question) {
      poll.addQuestion(question);
    })
    Inde.Question.findById(4).then(function(question) {
      poll.addQuestion(question);
    })
    Inde.Company.findById(1).then(function(company) {
      poll.setCompany(company);
    })
    Inde.SellPoint.findById(1).then(function(sellPoint) {
      sellPoint.setAttendedPoll(poll);
      Inde.Contest.findById(1).then(function(contest) {
        sellPoint.setContest(contest);
      })
    })
    Inde.SellPoint.findById(2).then(function(sellPoint) {
      sellPoint.setAttendedPoll(poll);
      Inde.Contest.findById(2).then(function(contest) {
        sellPoint.setContest(contest);
      })
    })
    Inde.SellPoint.findById(3).then(function(sellPoint) {
      sellPoint.setUnattendedPoll(poll);
      Inde.Contest.findById(3).then(function(contest) {
        sellPoint.setContest(contest);
      })
    })
    Inde.SellPoint.findById(4).then(function(sellPoint) {
      sellPoint.setUnattendedPoll(poll);
      Inde.Contest.findById(3).then(function(contest) {
        sellPoint.setContest(contest);
      })
    })
    Inde.Poll.create({
      name: "Encuesta de colores",
      description: "Queremos saber los colores favoritos de la gente"
    }).then(function(poll){
      Inde.Question.findById(2).then(function(question) {
        poll.addQuestion(question);
      })
      Inde.Question.findById(5).then(function(question) {
        poll.addQuestion(question);
      })
      Inde.Company.findById(2).then(function(company) {
        poll.setCompany(company);
      })
      Inde.SellPoint.findById(1).then(function(sellPoint) {
        sellPoint.setUnattendedPoll(poll);
      })
      Inde.SellPoint.findById(2).then(function(sellPoint) {
        sellPoint.setUnattendedPoll(poll);
      })
      Inde.SellPoint.findById(3).then(function(sellPoint) {
        sellPoint.setAttendedPoll(poll);
      })
      Inde.SellPoint.findById(4).then(function(sellPoint) {
        sellPoint.setAttendedPoll(poll);
      })
      Inde.Poll.create({
        name: "Encuesta de música",
        description: "Queremos saber la música favorita de la gente"
      }).then(function(poll){
        Inde.Question.findById(3).then(function(question) {
          poll.addQuestion(question);
        })
        Inde.Question.findById(4).then(function(question) {
          poll.addQuestion(question);
        })
        Inde.Question.findById(5).then(function(question) {
          poll.addQuestion(question);
        })
        Inde.Company.findById(2).then(function(company) {
          poll.setCompany(company);
        })
        Inde.SellPoint.findById(3).then(function(sellPoint) {
          sellPoint.setAttendedPoll(poll);
        })
        Inde.SellPoint.findById(4).then(function(sellPoint) {
          sellPoint.setAttendedPoll(poll);
        })
        createAnsweredPolls();
      });
    });
  });
}

//Creamos encuestas contestadas
var createAnsweredPolls = function () {
  Inde.AnsweredPoll.create({}).then(function(anspoll) {
    Inde.User.findById(getRandomInt(1,3)).then(function(user) {
      user.addAnsweredPoll(anspoll);
    })
    Inde.Poll.findById(1).then(function(poll) {
      poll.addAnsweredPoll(anspoll);
      anspoll.setSellPoint(poll.getSellPoints()[0]);
    })
    Inde.Employee.findById(getRandomInt(1,2)).then(function(employee) {
      anspoll.setEmployee(employee);
    })
    Inde.Answer.create({
    }).then(function(answer){
      Inde.PossibleOption.findById(getRandomInt(1,7)).then(function(possopt) {
        answer.setPossibleOption(possopt);
      })
      Inde.Question.findById(1).then(function(question) {
        question.addAnswer(answer);
      })
      anspoll.addAnswer(answer);
    });
    Inde.Answer.create({
      string_value: 'Excelente que me pregunten por mi comida favorita'
    }).then(function(answer){
      Inde.Question.findById(4).then(function(question) {
        question.addAnswer(answer);
      })
      anspoll.addAnswer(answer);
    });
    Inde.AnsweredPoll.create({}).then(function(anspoll) {
      Inde.User.findById(getRandomInt(1,3)).then(function(user) {
        user.addAnsweredPoll(anspoll);
      })
      Inde.Poll.findById(1).then(function(poll) {
        poll.addAnsweredPoll(anspoll);
        anspoll.setSellPoint(poll.getSellPoints()[0]);
      })
      Inde.Employee.findById(getRandomInt(1,2)).then(function(employee) {
        anspoll.setEmployee(employee);
      })
      Inde.Answer.create({
      }).then(function(answer){
        Inde.PossibleOption.findById(getRandomInt(1,7)).then(function(possopt) {
          answer.setPossibleOption(possopt);
        })
        Inde.Question.findById(1).then(function(question) {
          question.addAnswer(answer);
        })
        anspoll.addAnswer(answer);
      });
      Inde.Answer.create({
        string_value: 'Qué comida favorita elegiré?'
      }).then(function(answer){
        Inde.Question.findById(4).then(function(question) {
          question.addAnswer(answer);
        })
        anspoll.addAnswer(answer);
      });
      Inde.AnsweredPoll.create({}).then(function(anspoll) {
        Inde.User.findById(getRandomInt(1,3)).then(function(user) {
          user.addAnsweredPoll(anspoll);
        })
        Inde.Poll.findById(2).then(function(poll) {
          poll.addAnsweredPoll(anspoll);
          anspoll.setSellPoint(poll.getSellPoints()[0]);
        })
        Inde.Employee.findById(getRandomInt(3,5)).then(function(employee) {
          anspoll.setEmployee(employee);
        })
        Inde.Answer.create({
        }).then(function(answer){
          Inde.PossibleOption.findById(getRandomInt(8,12)).then(function(possopt) {
            answer.setPossibleOption(possopt);
          })
          Inde.Question.findById(1).then(function(question) {
            question.addAnswer(answer);
          })
          anspoll.addAnswer(answer);
        });
        Inde.Answer.create({
          number_value: 4
        }).then(function(answer){
          Inde.Question.findById(4).then(function(question) {
            question.addAnswer(answer);
          })
          anspoll.addAnswer(answer);
        });
        Inde.AnsweredPoll.create({}).then(function(anspoll) {
          Inde.User.findById(getRandomInt(1,3)).then(function(user) {
            user.addAnsweredPoll(anspoll);
          })
          Inde.Poll.findById(2).then(function(poll) {
            poll.addAnsweredPoll(anspoll);
            anspoll.setSellPoint(poll.getSellPoints()[0]);
          })
          Inde.Employee.findById(getRandomInt(3,5)).then(function(employee) {
            anspoll.setEmployee(employee);
          })
          Inde.Answer.create({
          }).then(function(answer){
            Inde.PossibleOption.findById(getRandomInt(8,12)).then(function(possopt) {
              answer.setPossibleOption(possopt);
            })
            Inde.Question.findById(1).then(function(question) {
              question.addAnswer(answer);
            })
            anspoll.addAnswer(answer);
          });
          Inde.Answer.create({
            number_value: 5
          }).then(function(answer){
            Inde.Question.findById(4).then(function(question) {
              question.addAnswer(answer);
            })
            anspoll.addAnswer(answer);
          });
          Inde.AnsweredPoll.create({}).then(function(anspoll) {
            Inde.User.findById(getRandomInt(1,3)).then(function(user) {
              user.addAnsweredPoll(anspoll);
            })
            Inde.Poll.findById(3).then(function(poll) {
              poll.addAnsweredPoll(anspoll);
              anspoll.setSellPoint(poll.getSellPoints()[0]);
            })
            Inde.Employee.findById(getRandomInt(3,5)).then(function(employee) {
              anspoll.setEmployee(employee);
            })
            Inde.Answer.create({
            }).then(function(answer){
              Inde.PossibleOption.findById(getRandomInt(13,17)).then(function(possopt) {
                answer.setPossibleOption(possopt);
              })
              Inde.Question.findById(1).then(function(question) {
                question.addAnswer(answer);
              })
              anspoll.addAnswer(answer);
            });
            Inde.Answer.create({
              number_value: 5
            }).then(function(answer){
              Inde.Question.findById(4).then(function(question) {
                question.addAnswer(answer);
              })
              anspoll.addAnswer(answer);
            });
            Inde.Answer.create({
              string_value: 'Buenísima la música'
            }).then(function(answer){
              Inde.Question.findById(4).then(function(question) {
                question.addAnswer(answer);
              })
              anspoll.addAnswer(answer);
            });
            Inde.AnsweredPoll.create({}).then(function(anspoll) {
              Inde.User.findById(getRandomInt(1,3)).then(function(user) {
                user.addAnsweredPoll(anspoll);
              })
              Inde.Poll.findById(3).then(function(poll) {
                poll.addAnsweredPoll(anspoll);
                anspoll.setSellPoint(poll.getSellPoints()[0]);
              })
              Inde.Employee.findById(getRandomInt(3,5)).then(function(employee) {
                anspoll.setEmployee(employee);
              })
              Inde.Answer.create({
              }).then(function(answer){
                Inde.PossibleOption.findById(getRandomInt(13,17)).then(function(possopt) {
                  answer.setPossibleOption(possopt);
                })
                Inde.Question.findById(1).then(function(question) {
                  question.addAnswer(answer);
                })
                anspoll.addAnswer(answer);
              });
              Inde.Answer.create({
                number_value: 2
              }).then(function(answer){
                Inde.Question.findById(4).then(function(question) {
                  question.addAnswer(answer);
                })
                anspoll.addAnswer(answer);
              });
              Inde.Answer.create({
                string_value: 'Odié la decoración del lugar'
              }).then(function(answer){
                Inde.Question.findById(4).then(function(question) {
                  question.addAnswer(answer);
                })
                anspoll.addAnswer(answer);
              });
            })
          })
        })
      })
    })
  })
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
