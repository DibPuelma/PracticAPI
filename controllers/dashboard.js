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

module.exports = {
  byDateTotalAnswers(req, res) {
    var sql = '';
    sql += 'SELECT COUNT("Users".gender), "Users".gender ';
    sql += 'FROM "AnsweredPolls", "SellPoints", "Users" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\' ';
    sql += 'GROUP BY "Users".gender ';
    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  byDateAverage(req, res){
      var sql = '';
      sql += 'SELECT AVG("Answers".number_value), "Users".gender, COUNT("Users".gender) ';
      sql += 'FROM "AnsweredPolls", "SellPoints", "Users", "Answers" ';
      sql += 'WHERE ';
      sql += '  "Answers".number_value IS NOT NULL AND ';
      sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
      sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
      sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
      sql += '  "AnsweredPolls".user_id = "Users".id AND ';
      sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
      sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
      sql += 'GROUP BY "Users".gender ';

      models.sequelize.query(sql).spread(function(results, metadata) {
        res.status(200).json( results );
      }).catch(function(error) {
        res.status(500).json({ error: error});
      });
  },
  weekAverage(req, res){
    var sql = '';
    sql += 'SELECT AVG("Answers".number_value), "Users".gender, COUNT("Users".gender) ';
    sql += 'FROM "AnsweredPolls", "SellPoints", "Users", "Answers" ';
    sql += 'WHERE ';
    sql += '  "Answers".number_value IS NOT NULL AND ';
    sql += '  "AnsweredPolls".created_at > CURRENT_DATE - INTERVAL \'7 days\' AND ';
    sql += '  "AnsweredPolls".created_at < CURRENT_TIMESTAMP AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Users".gender ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  mostUsedWords(req, res){

  },
  bestAverageQuestion(req, res){
    var sql = '';
    sql += 'SELECT "Questions".text, AVG("Answers".number_value) AS avg ';
    sql += 'FROM "AnsweredPolls", "Users", "SellPoints", "Answers", "Polls", "Questions" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';

    if(req.params.gender === 'f' || req.params.gender === 'm'){
      sql += '  "AnsweredPolls".user_id = "Users".id AND ';
      sql += '  "Users".gender = \'' + req.params.gender + '\' AND ';
    }
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "Answers".number_value IS NOT NULL AND ';
    sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Questions".id ';
    sql += 'ORDER BY avg DESC ';
    sql += 'LIMIT 3';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  bestAveragePoll(req, res){
    var sql = '';
    sql += 'SELECT "Polls".name, AVG("Answers".number_value) AS avg ';
    sql += 'FROM "AnsweredPolls", "Users", "Answers", "Polls" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';

    if(req.params.gender === 'f' || req.params.gender === 'm'){
      sql += '  "AnsweredPolls".user_id = "Users".id AND ';
      sql += '  "Users".gender = \'' + req.params.gender + '\' AND ';
    }
    sql += '  "Answers".number_value IS NOT NULL AND ';
    sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
    sql += '  "AnsweredPolls".poll_id = "Polls".id AND ';
    sql += '  "Polls".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Polls".id ';
    sql += 'ORDER BY avg DESC ';
    sql += 'LIMIT 5';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  bestAverageSellPoint(req, res){
    var sql = '';
    sql += 'SELECT "SellPoints".location, AVG("Answers".number_value) AS avg ';
    sql += 'FROM "AnsweredPolls", "Users", "Answers", "SellPoints" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';

    if(req.params.gender === 'f' || req.params.gender === 'm'){
      sql += '  "AnsweredPolls".user_id = "Users".id AND ';
      sql += '  "Users".gender = \'' + req.params.gender + '\' AND ';
    }
    sql += '  "Answers".number_value IS NOT NULL AND ';
    sql += '  "AnsweredPolls".id = "Answers".answered_poll_id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "SellPoints".id ';
    sql += 'ORDER BY avg DESC ';
    sql += 'LIMIT 5';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  mostYesAndNo(req, res){
    var sql = '';
    sql += 'SELECT "Questions".text, "Answers".boolean_value, COUNT("Answers".boolean_value), "Users".gender ';
    sql += 'FROM "AnsweredPolls", "SellPoints", "Users", "Questions", "Answers" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "Answers".boolean_value IS NOT NULL AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Users".gender, "Questions".text, "Answers".boolean_value ';
    sql += 'ORDER BY count DESC';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  mostChosen(req, res){
    var sql = '';
    sql += 'SELECT "Questions".id, "PossibleOptions".value, COUNT("PossibleOptions".value), "Users".gender ';
    sql += 'FROM "Questions", "AnsweredPolls", "SellPoints", "Users", "PossibleOptions", "Answers" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "Answers".question_id = "Questions".id AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "Answers".possible_option_id = "PossibleOptions".id AND ';
    sql += '  "Answers".answered_poll_id = "AnsweredPolls".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Users".gender, "PossibleOptions".value, "Questions".id ';
    sql += 'ORDER BY count DESC';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  },
  averageAge(req, res){
    var sql = '';
    sql += 'SELECT AVG(EXTRACT(YEAR FROM AGE("Users".birthdate))), COUNT("Users".gender), "Users".gender ';
    sql += 'FROM "Users", "SellPoints", "AnsweredPolls" ';
    sql += 'WHERE ';
    sql += '  "AnsweredPolls".created_at > TO_TIMESTAMP(\'' + req.params.start_date + '\', \'YYYY-MM-DD\')  AND ';
    sql += '  "AnsweredPolls".created_at < TO_TIMESTAMP(\'' + req.params.end_date + '\', \'YYYY-MM-DD\') AND ';
    sql += '  "AnsweredPolls".user_id = "Users".id AND ';
    sql += '  "AnsweredPolls".sell_point_id = "SellPoints".id AND ';
    sql += '  "SellPoints".company_id = \'' + req.params.company_id + '\'';
    sql += 'GROUP BY "Users".gender ';

    models.sequelize.query(sql).spread(function(results, metadata) {
      res.status(200).json( results );
    }).catch(function(error) {
      res.status(500).json({ error: error});
    });
  }
}
