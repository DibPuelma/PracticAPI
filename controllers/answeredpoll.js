var AnsweredPoll = require('../models/').AnsweredPoll;
var Employee = require('../models/').Employee;
var SellPoint = require('../models/').SellPoint;
var Answer = require('../models/').Answer;
var User = require('../models/').User;
var Poll = require('../models/').Poll;
var Question = require('../models/').Question;
var Company = require('../models/').Company;
var UserContest = require('../models/').UserContest;
var PossibleOption = require('../models/').PossibleOption;
var models = require('../models');

var util = require('util');

var modelGetter = {
  poll: "Polls",
  sell_point: "SellPoints",
  employee: "Employees"
}

var schema = {
  'answers': {
    notEmpty: true,
    isArray: true,
    errorMessage: 'Invalid answers, must be an array'
  },
  'employeeId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid employee ID, must be a number'
  },
  'sellPointId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid sellPoint ID, must be a number'
  },
  'userId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid user ID, must be a number'
  }
};

var filterParams = function(req) {
  var keys = Object.keys(schema);

  var data = {};
  for (var param in req.body)
  if (keys.indexOf(param) > -1)
  data[param] = req.body[param];

  return data;
}

module.exports = {
  index(req, res) {
    var sql = '';
    sql += 'SELECT "AnsweredPolls".*, "Companies".logo, "SellPoints".location , AVG("Answers".number_value) ';
    sql += 'FROM "Answers", "AnsweredPolls", "Questions", "Companies", "SellPoints" ';
    sql += 'WHERE ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = "Companies".id AND ';
    sql += '  "AnsweredPolls".user_id = \'' + req.params.user_id + '\'';
    sql += 'GROUP BY "AnsweredPolls".id, "Companies".logo, "SellPoints".location; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  companyAverage(req, res) {
    var sql = '';
    sql += 'SELECT "AnsweredPolls".created_at, AVG("Answers".number_value)';
    sql += 'FROM "Answers", "AnsweredPolls", "SellPoints" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "AnsweredPolls".created_at ';
    sql += 'ORDER BY "AnsweredPolls".created_at; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      var sum = 0;
      var acumulatedAverage = 0;
      results.map((result, i) => {
        if(result.avg !== null) {
          sum += parseFloat(result.avg);
          acumulatedAverage = sum / (i+1);
        }
        result["acum_avg"] = acumulatedAverage;
      })
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  modelAverage(req,res){
    var sql = '';
    sql += 'SELECT "AnsweredPolls".created_at, AVG("Answers".number_value)';
    sql += 'FROM "Answers", "AnsweredPolls", \"' + modelGetter[req.params.model] + '\" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = \"' + modelGetter[req.params.model] + '\".id AND ';
    sql += '  \"' + modelGetter[req.params.model] + '\".id = \'' + req.params.id + '\'';
    sql += 'GROUP BY "AnsweredPolls".created_at ';
    sql += 'ORDER BY "AnsweredPolls".created_at; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      var sum = 0;
      var acumulatedAverage = 0;
      results.map((result, i) => {
        if(result.avg !== null) {
          sum += parseFloat(result.avg);
          acumulatedAverage = sum / (i+1);
        }
        result["acum_avg"] = acumulatedAverage;
      })
      res.status(200).json( results );
    }).catch(function(error) {
      console.log(error);
      res.status(500).json({ error: error});
    });
  },
  questionAverage(req, res) {
    var sql = '';
    sql += 'SELECT "AnsweredPolls".created_at, AVG("Answers".number_value)';
    sql += 'FROM "Answers", "AnsweredPolls", "Questions" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Questions".id = \'' + req.params.question_id + '\'';
    sql += 'GROUP BY "AnsweredPolls".created_at ';
    sql += 'ORDER BY "AnsweredPolls".created_at; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      var sum = 0;
      var acumulatedAverage = 0;
      results.map((result, i) => {
        if(result.avg !== null) {
          sum += parseFloat(result.avg);
          acumulatedAverage = sum / (i+1);
        }
        result["acum_avg"] = acumulatedAverage;
      })
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  companyCount(req, res) {
    var sql = '';
    sql += 'SELECT "AnsweredPolls".created_at, COUNT("AnsweredPolls")';
    sql += 'FROM "AnsweredPolls", "SellPoints" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "AnsweredPolls".created_at ';
    sql += 'ORDER BY "AnsweredPolls".created_at; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  modelCount(req, res) {
    var sql = '';
    sql += 'SELECT "AnsweredPolls".created_at, COUNT("AnsweredPolls")';
    sql += 'FROM "AnsweredPolls", \"' + modelGetter[req.params.model] + '\" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".' + req.params.model + '_id = \"' + modelGetter[req.params.model] + '\".id AND ';
    sql += '  \"' + modelGetter[req.params.model] + '\".id = \'' + req.params.id + '\'';
    sql += 'GROUP BY "AnsweredPolls".created_at ';
    sql += 'ORDER BY "AnsweredPolls".created_at; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  questionCount(req, res) {
    var sql = '';
    sql += 'SELECT "AnsweredPolls".created_at, COUNT("Answers")';
    sql += 'FROM "Answers", "Questions", "AnsweredPolls" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Questions".id = \'' + req.params.question_id + '\'';
    sql += 'GROUP BY "AnsweredPolls".created_at ';
    sql += 'ORDER BY "AnsweredPolls".created_at; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  companyAge(req, res) {
    var sql = '';
    sql += 'SELECT "Users".birthdate, "Users".gender, COUNT("Users")' ;
    sql += 'FROM "AnsweredPolls", "SellPoints" , "Users"';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Users".birthdate, "Users".gender ';
    sql += 'ORDER BY "Users".birthdate DESC; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      results.map((result) => {
        result['age'] = _calculateAge(result.birthdate);
      })
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  modelAge(req, res) {
    var sql = '';
    sql += 'SELECT "Users".birthdate, "Users".gender, COUNT("Users")' ;
    sql += 'FROM "AnsweredPolls", \"' + modelGetter[req.params.model] + '\" , "Users"';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".' + req.params.model + '_id = \"' + modelGetter[req.params.model] + '\".id AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  \"' + modelGetter[req.params.model] + '\".id = \'' + req.params.id + '\'';
    sql += 'GROUP BY "Users".birthdate, "Users".gender ';
    sql += 'ORDER BY "Users".birthdate DESC; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      results.map((result) => {
        result['age'] = _calculateAge(result.birthdate);
      })
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  questionAge(req, res) {
    var sql = '';
    sql += 'SELECT "Users".birthdate, "Users".gender, COUNT("Users")' ;
    sql += 'FROM "AnsweredPolls", "Questions", "Answers" , "Users"';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Questions".id = \'' + req.params.question_id + '\'';
    sql += 'GROUP BY "Users".birthdate, "Users".gender ';
    sql += 'ORDER BY "Users".birthdate DESC; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      results.map((result) => {
        result['age'] = _calculateAge(result.birthdate);
      })
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  companyGender(req, res) {
    var sql = '';
    sql += 'SELECT "Users".gender, COUNT("Users")' ;
    sql += 'FROM "AnsweredPolls", "SellPoints" , "Users"';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Users".gender ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  modelGender(req, res) {
    var sql = '';
    sql += 'SELECT "Users".gender, COUNT("Users")' ;
    sql += 'FROM "AnsweredPolls", \"' + modelGetter[req.params.model] + '\" , "Users"';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".' + req.params.model + '_id = \"' + modelGetter[req.params.model] + '\".id AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  \"' + modelGetter[req.params.model] + '\".id = \'' + req.params.id + '\'';
    sql += 'GROUP BY "Users".gender ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  questionGender(req, res) {
    var sql = '';
    sql += 'SELECT "Users".gender, COUNT("Users")' ;
    sql += 'FROM "AnsweredPolls", "Questions", "Answers" , "Users"';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Questions".id = \'' + req.params.question_id + '\'';
    sql += 'GROUP BY "Users".gender ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  questionOptionsAnswers(req, res) {
    var sql = '';
    sql += 'SELECT "PossibleOptions".value, COUNT("PossibleOptions")';
    sql += 'FROM "Answers", "Questions", "PossibleOptions" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Answers".possible_option_id = "PossibleOptions".id AND ';
    sql += '  "Questions".id = \'' + req.params.question_id + '\'';
    sql += 'GROUP BY "PossibleOptions".value ';
    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  questionBooleanAnswers(req, res) {
    var sql = '';
    sql += 'SELECT COUNT("Answers"), "Answers".boolean_value ';
    sql += 'FROM "Answers", "Questions", "AnsweredPolls" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at >= TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at <= TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Questions".id = \'' + req.params.question_id + '\'';
    sql += 'GROUP BY "Answers".boolean_value; ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  indexByPoll(req, res) {
    AnsweredPoll.findAll({where: {poll_id: req.params.poll_id}, include: [Answer, {model: SellPoint, include: Company}]})
    .then((answeredpolls) => {
      res.status(200).json(answeredpolls);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  create(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);
      promises = [];
      var newAnsweredPoll;
      var createAnsweredPoll = AnsweredPoll.create({})
      .then((answeredpoll) => {
        newAnsweredPoll = answeredpoll;
        var setEmployee = Employee.findById(req.body.employeeId)
        .then((employee) => {
          answeredpoll.setEmployee(employee);
        })
        .catch(function (error) {
          console.log("error emple");
          console.log(error);
        })
        promises.push(setEmployee);

        var setSellPoint = SellPoint.findById(req.body.sellPointId)
        .then((sellPoint) => {
          answeredpoll.setSellPoint(sellPoint);
          var setUser = User.findById(req.body.userId)
          .then((user) => {
            answeredpoll.setUser(user);
            var getContest = sellPoint.getContest()
            .then((contest) => {
              var userToContest = UserContest.findOrCreate({where: {user_id:user.id, contest_id:contest.id}})
              promises.push(userToContest);
            })
            promises.push(getContest);
          })
          .catch(function (error) {
            console.log("error user");
            console.log(error);
          })
          promises.push(setUser);
        })
        .catch(function (error) {
          console.log("error sellp");
          console.log(error);
        })
        promises.push(setSellPoint);

        var setPoll = Poll.findById(req.params.poll_id)
        .then((poll) => {
          answeredpoll.setPoll(poll);
        })
        .catch(function (error) {
          console.log("error poll");
          console.log(error);
        })
        promises.push(setPoll);
        req.body.answers.map((answer) => {
          var addNewAnswer = Answer.create(answer)
          .then((newAnswer) => {
            Question.findById(answer.question)
            .then((question) => {
              question.addAnswer(newAnswer);
            })
            .catch(function (error) {
              console.log("error de pregunta");
              console.log(error);
            })
            answeredpoll.addAnswer(newAnswer);
          })
          .catch(function (error) {
            console.log("error de respuesta");
            console.log(error);
          })
          promises.push(addNewAnswer);
        })
      });
      promises.push(createAnsweredPoll);
      Promise.all(promises)
      .then(() => {
        res.status(200).json(newAnsweredPoll);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
  },
  showByUser(req, res) {
    AnsweredPoll.findOne({where: {id: req.params.id, user_id: req.params.user_id}, include: {model: Answer, include: [Question, PossibleOption]}})
    .then((answeredpoll) => {
      res.status(200).json(answeredpoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  show(req, res) {
    AnsweredPoll.findById(req.params.id, {include: {model: Answer, include: [Question, PossibleOption]}})
    .then((answeredpoll) => {
      res.status(200).json(answeredpoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  delete(req, res) {
    AnsweredPoll.destroy({where: {id: req.params.id}})
    .then((deletedAnsweredPoll) => {
      res.status(200).json(deletedAnsweredPoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}

var _calculateAge = function(birthday) {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
