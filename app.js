var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var expressValidator = require('express-validator');

// app.use(require('./controllers'));
app.use(bodyParser.json());
app.use(expressValidator([]));

var Poll             = require('./controllers/poll.js');
var Question         = require('./controllers/question.js');
var OptionsContainer = require('./controllers/optionscontainer.js');
var PossibleOption   = require('./controllers/possibleoption.js');
var AnsweredPoll     = require('./controllers/answeredpoll.js');
var Answer           = require('./controllers/answer.js');



//Encuestas
app.get('company/:company_id/poll',                                   Poll.index)
app.post('company/:company_id/poll',                                  Poll.create);
app.get('company/:company_id/poll/:id',                               Poll.show);
app.delete('company/:company_id/poll/:id',                            Poll.delete);
app.put('company/:company_id/poll/:id',                               Poll.update);
app.put('company/:company_id/poll/:poll_id/sellpoint/:sell_point_id', Poll.changeActiveSellPoint);

//Preguntas
app.post('company/:company_id/question',                     Question.create);
app.get('company/:company_id/question/:id',                  Question.show);
app.delete('company/:company_id/question/:id',               Question.delete);
app.put('company/:company_id/question/:id',                  Question.update);
app.delete('company/:company_id/poll/:poll_id/question/:id', Question.removeQuestionFromPoll);
app.put('company/:company_id/poll/:poll_id/question/:id',    Question.addQuestionToPoll);

//Contenedores de opciones
app.get('company/:company_id/optcont',        OptionsContainer.index);
app.post('company/:company_id/optcont',       OptionsContainer.create);
app.get('company/:company_id/optcont/:id',    OptionsContainer.show);
app.delete('company/:company_id/optcont/:id', OptionsContainer.delete);
app.put('company/:company_id/optcont/:id',    OptionsContainer.update);

//Opciones
app.get('company/:company_id/possopt',                             PossibleOption.index);
app.post('company/:company_id/possopt',                            PossibleOption.create);
app.get('company/:company_id/possopt/:id',                         PossibleOption.show);
app.delete('company/:company_id/possopt/:id',                      PossibleOption.delete);
app.put('company/:company_id/possopt/:id',                         PossibleOption.update);
app.delete('company/:company_id/optcont/:opt_cont_id/possopt/:id', PossibleOption.removeOptionFromContainer);
app.put('company/:company_id/optcont/:opt_cont_id/possopt/:id',    PossibleOption.addOptionToContainer);

//Encuestas Contestadas
app.post('company/:company_id/poll/:poll_id/answered_poll',       AnsweredPoll.create);
app.get('user/:user_id/answered_poll/:id',                        AnsweredPoll.indexByUser);
app.get('company/:company_id/poll/:poll_id/answered_poll/:id',    AnsweredPoll.show);
app.delete('company/:company_id/poll/:poll_id/answered_poll/:id', AnsweredPoll.delete);

//Preguntas
app.get('company/:company_id/poll/:poll_id/answered_poll/:answered_poll_id/answer/:id', Answer.show);



// var models = require('./models/');
// models.sequelize
//   .authenticate()
//   .then(function () {
//     console.log('Connection successful');
//   })
//   .catch(function(error) {
//     console.log("Error creating connection:", error);
//   });

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
