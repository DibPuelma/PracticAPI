var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var expressValidator = require('express-validator');
var session          = require('express-session');
var cors             = require('./middlewares/cors/cors.js');
var multer           = require('multer');
var logoStorage = multer.diskStorage({
    destination: 'images/logos',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.mimetype.replace('image/', '.'))
  }
})

var logoUpload = multer({ storage: logoStorage })

var pictureStorage = multer.diskStorage({
    destination: 'images/pictures',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.mimetype.replace('image/', '.'))
  }
})

var pictureUpload = multer({ storage: pictureStorage })

app.use(express.static('images'))

app.set('port', (process.env.PORT || 8000));

app.use(cors());
app.use(require('./controllers'));
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw({
  limit: '1000kb',
  type: 'image/*'
}));



app.use(expressValidator({
 customValidators: {
    isArray: function(value) {
        return Array.isArray(value);
    },
    isValidType: function(value) {
      return value === 'text' || value === 'options' || value === 'number' || value == 'boolean'
    }
 }
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var User             = require('./controllers/user.js');
var Company          = require('./controllers/company.js');
var Employee         = require('./controllers/employee.js');
var SellPoint        = require('./controllers/sellpoint.js');
var Contest          = require('./controllers/contest.js');
var Prize            = require('./controllers/prize.js');
var Poll             = require('./controllers/poll.js');
var Question         = require('./controllers/question.js');
var OptionsContainer = require('./controllers/optionscontainer.js');
var PossibleOption   = require('./controllers/possibleoption.js');
var AnsweredPoll     = require('./controllers/answeredpoll.js');
var Answer           = require('./controllers/answer.js');
var Excel            = require('./controllers/excel.js');
var Dashboard        = require('./controllers/dashboard.js');
var Manager          = require('./controllers/manager.js');

//Encuestas

app.get('/company/:company_id/poll',                                    Poll.index);
app.post('/company/:company_id/poll',                                   Poll.create);
app.get('/company/:company_id/poll/:id',                                Poll.show);
app.delete('/company/:company_id/poll/:id',                             Poll.delete);
app.put('/company/:company_id/poll/:id',                                Poll.update);

//Preguntas
app.post('/company/:company_id/question',                     Question.create);
app.get('/company/:company_id/question',                     Question.index);
app.get('/company/:company_id/question/:id',                  Question.show);
app.delete('/company/:company_id/question/:id',               Question.delete);
app.put('/company/:company_id/question/:id',                  Question.update);
app.delete('/company/:company_id/poll/:poll_id/question/:id', Question.removeQuestionFromPoll);
app.put('/company/:company_id/poll/:poll_id/question/:id',    Question.addQuestionToPoll);

//Contenedores de opciones
app.get('/company/:company_id/options_container',        OptionsContainer.index);
app.post('/company/:company_id/options_container',       OptionsContainer.create);
app.get('/company/:company_id/options_container/:id',    OptionsContainer.show);
app.delete('/company/:company_id/options_container/:id', OptionsContainer.delete);
app.put('/company/:company_id/options_container/:id',    OptionsContainer.update);

//Opciones
app.get('/company/:company_id/possible_option',                             PossibleOption.index);
app.post('/company/:company_id/possible_option',                            PossibleOption.create);
app.get('/company/:company_id/possible_option/:id',                         PossibleOption.show);
app.delete('/company/:company_id/possible_option/:id',                      PossibleOption.delete);
app.put('/company/:company_id/possible_option/:id',                         PossibleOption.update);
app.delete('/company/:company_id/options_container/:opt_cont_id/possible_option/:id', PossibleOption.removeOptionFromContainer);
app.put('/company/:company_id/options_container/:opt_cont_id/possible_option/:id',    PossibleOption.addOptionToContainer);

//Encuestas Contestadas
app.get('/user/:user_id/answered_poll',                            AnsweredPoll.index);
app.get('/user/:user_id/answered_poll/:id',                            AnsweredPoll.showByUser);
app.get('/company/:company_id/poll/:poll_id/answered_poll',        AnsweredPoll.indexByPoll);
app.post('/company/:company_id/poll/:poll_id/answered_poll',       AnsweredPoll.create);
app.get('/company/:company_id/poll/:poll_id/answered_poll/:id',    AnsweredPoll.show);
app.delete('/company/:company_id/poll/:poll_id/answered_poll/:id', AnsweredPoll.delete);

//Preguntas
app.get('/company/:company_id/question/:question_id/answer',                             Answer.indexByQuestion)
app.get('/company/:company_id/poll/:poll_id/answered_poll/:answered_poll_id/answer/:id', Answer.show);


//Usuarios
app.get('/user',              User.index);
app.get('/user/:id',          User.show);
app.post('/user',             User.create);
app.put('/user/:id',          User.update);
app.delete('/user/:id',       User.delete);
app.get('/user/:id/contests', User.contests);
app.post('/user/login',       User.login);
app.post('/user/logout',      User.logout);
app.get('/user/:id/prizes',   User.prizes);

//Compañías
app.get('/company',                       Company.index);
app.get('/company/:id',                   Company.show);
app.post('/company',                      Company.create);
app.put('/company/:id',                   Company.update);
app.delete('/company/:id',                Company.delete);
app.put('/company/:company_id/add_logo',  logoUpload.single('logo'), Company.addLogo)

//Empleados
app.get('/company/:company_id/employee',                                                  Employee.index);
app.get('/company/:company_id/employee/:id',                                              Employee.show);
app.post('/company/:company_id/employee',                                                 Employee.create);
app.put('/company/:company_id/employee/:id',                                              Employee.update);
app.delete('/company/:company_id/employee/:id',                                           Employee.delete);
app.put('/company/:company_id/employee/:id/add_picture', pictureUpload.single('picture'), Employee.addPicture);

//Puntos de venta
app.get('/company/:company_id/sell_point',                                           SellPoint.index);
app.get('/company/:company_id/sell_point/:id',                                       SellPoint.show);
app.get('/sell_point/:code',                                                         SellPoint.showByCode);
app.post('/company/:company_id/sell_point',                                          SellPoint.create);
app.put('/company/:company_id/sell_point/:id',                                       SellPoint.update);
app.delete('/company/:company_id/sell_point/:id',                                    SellPoint.delete);
app.get('/company/:company_id/sell_point/:sell_point_id/attended_poll/',             SellPoint.getActiveAttendedPoll);
app.put('/company/:company_id/sell_point/:sell_point_id/attended_poll/:poll_id/',    SellPoint.setActiveAttendedPoll);
app.get('/company/:company_id/sell_point/:sell_point_id/unattended_poll',            SellPoint.getActiveUnattendedPoll);
app.put('/company/:company_id/sell_point/:sell_point_id/unattended_poll/:poll_id',   SellPoint.setActiveUnattendedPoll);
app.get('/company/:company_id/sell_point/:sell_point_id/active_contest',             SellPoint.getActiveContest);
app.put('/company/:company_id/sell_point/:sell_point_id/active_contest/:contest_id', SellPoint.setActiveContest);

//Concursos
app.get('/company/:company_id/contest',        Contest.index);
app.get('/company/:company_id/contest/:id',    Contest.show);
app.post('/company/:company_id/contest',       Contest.create);
app.put('/company/:company_id/contest/:id',    Contest.update);
app.delete('/company/:company_id/contest/:id', Contest.delete);

// Datos
// Promedios
app.get('/company/:company_id/average_stars/:start_date/:end_date',                                       AnsweredPoll.companyAverage);
app.get('/company/:company_id/question/:question_id/average_stars/:start_date/:end_date',                 AnsweredPoll.questionAverage);
app.get('/company/:company_id/:model/:id/average_stars/:start_date/:end_date',                            AnsweredPoll.modelAverage);
app.get('/company/:company_id/question/:question_id/average_stars_by_gender/:start_date/:end_date',       AnsweredPoll.questionAverageByGender);
app.get('/company/:company_id/:model/:id/average_stars_by_gender/:start_date/:end_date',                  AnsweredPoll.modelAverageByGender);

// Total respuestas
app.get('/company/:company_id/total_answers/:start_date/:end_date',                                       AnsweredPoll.companyCount);
app.get('/company/:company_id/question/:question_id/total_answers/:start_date/:end_date',                 AnsweredPoll.questionCount);
app.get('/company/:company_id/:model/:id/total_answers/:start_date/:end_date',                            AnsweredPoll.modelCount);
app.get('/company/:company_id/question/:question_id/total_answers_by_gender/:start_date/:end_date',       AnsweredPoll.questionCountByGender);
app.get('/company/:company_id/:model/:id/total_answers_by_gender/:start_date/:end_date',                  AnsweredPoll.modelCountByGender);

// Edad encuestados
app.get('/company/:company_id/respondents_age/:start_date/:end_date',                           AnsweredPoll.companyAge);
app.get('/company/:company_id/question/:question_id/respondents_age/:start_date/:end_date',     AnsweredPoll.questionAge);
app.get('/company/:company_id/:model/:id/respondents_age/:start_date/:end_date',                AnsweredPoll.modelAge);
app.get('/company/:company_id/question/:question_id/average_age/:start_date/:end_date',     AnsweredPoll.questionAverageByGender);
app.get('/company/:company_id/:model/:id/average_age/:start_date/:end_date',                    AnsweredPoll.modelAverageAgeByGender);

// Cantidad por género
app.get('/company/:company_id/respondents_gender/:start_date/:end_date',                           AnsweredPoll.companyGender);
app.get('/company/:company_id/question/:question_id/respondents_gender/:start_date/:end_date',     AnsweredPoll.questionGender);
app.get('/company/:company_id/:model/:id/respondents_gender/:start_date/:end_date',                AnsweredPoll.modelGender);


// Respuestas
app.get('/company/:company_id/question/:question_id/options_answers/:start_date/:end_date', AnsweredPoll.questionOptionsAnswers);
app.get('/company/:company_id/question/:question_id/boolean_answers/:start_date/:end_date', AnsweredPoll.questionBooleanAnswers);

//Dashboard
app.get('/company/:company_id/dashboard/total_answers/:start_date/:end_date',                   Dashboard.byDateTotalAnswers);
app.get('/company/:company_id/dashboard/average/:start_date/:end_date',                         Dashboard.byDateAverage);
app.get('/company/:company_id/dashboard/:gender/question/best_average/:start_date/:end_date',   Dashboard.bestAverageQuestion);
app.get('/company/:company_id/dashboard/:gender/:model/best_average/:start_date/:end_date',     Dashboard.bestAverageModel);
app.get('/company/:company_id/dashboard/most_yes_and_no/:start_date/:end_date',                 Dashboard.mostYesAndNo);
app.get('/company/:company_id/dashboard/most_chosen/:start_date/:end_date',                     Dashboard.mostChosen);
app.get('/company/:company_id/dashboard/average_age/:start_date/:end_date',                     Dashboard.averageAge);

//Premios
app.get('/company/:company_id/contest/:contest_id/prize',        Prize.index);
app.get('/company/:company_id/contest/:contest_id/prize/:id',    Prize.show);
app.post('/company/:company_id/contest/:contest_id/prize',       Prize.create);
app.put('/company/:company_id/contest/:contest_id/prize/:id',    Prize.update);
app.delete('/company/:company_id/contest/:contest_id/prize/:id', Prize.delete);

//Excel
app.get('/company/:company_id/excel/question', Excel.getByQuestion);
app.get('/company/:company_id/excel/employee', Excel.getByEmployee);
app.get('/company/:company_id/excel/poll', Excel.getByPoll);
app.get('/company/:company_id/excel/sell_point', Excel.getBySellPoint);
app.get('/company/:company_id/excel/answered_poll', Excel.getAll);

// Managers
app.get   ('/manager',                            Manager.index);
app.get   ('/company/:company_id/manager',        Manager.byCompany);
app.get   ('/manager/:id',                        Manager.show);
app.post  ('/manager',                            Manager.create);
app.put   ('/manager/:id',                        Manager.update);
app.delete('/manager/:id',                        Manager.delete);
app.post  ('/manager/login',                      Manager.login);
app.post  ('/manager/logout',                     Manager.logout);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
