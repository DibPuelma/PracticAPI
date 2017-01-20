var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var poll = require('./controllers/poll.js');
var question = require('./controllers/question.js');
var optcont = require('./controllers/optionscontainer.js');
var possopt = require('./controllers/possibleoption.js');
var answeredpoll = require('./controllers/answeredpoll.js');
var answer = require('./controllers/answer.js');


// app.use(require('./controllers'));
app.use(bodyParser.json());

//Encuestas
app.post('/poll', poll.create);
app.get('/poll/:id', poll.show);
app.delete('/poll/:id', poll.delete);
app.put('/poll/:id', poll.update);
app.delete('/poll/:poll_id/question/:question_id', poll.removeQuestionFromPoll);
app.put('/poll/:poll_id/sellpoint/:sell_point_id', poll.changeActiveSellPoint);

//Preguntas
app.post('/question', question.create);
app.get('/question/:id', question.show);
app.delete('/question/:id', question.delete);
app.put('/question/:id', question.update);

//Contenedores de opciones
app.post('/optcont', optcont.create);
app.get('/optcont/:id', optcont.show);
app.delete('/optcont/:id', optcont.delete);
app.put('/optcont/:id', optcont.update);
app.delete('/optcont/:optcont_id/possopt/:possopt_id', optcont.removeCurrentOption);

//Opciones
app.post('/possopt', possopt.create);
app.get('/possopt/:id', possopt.show);
app.delete('/possopt/:id', possopt.delete);
app.put('/possopt/:id', possopt.update);

//Encuestas Contestadas
app.post('/answeredpoll', answeredpoll.create);
app.get('/answeredpoll/:id', answeredpoll.show);
app.delete('/answeredpoll/:id', answeredpoll.delete);

//Preguntas
app.get('/answer/:id', answer.show);



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
