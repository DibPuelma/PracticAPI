var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var expressValidator = require('express-validator');
var session          = require('express-session');

app.use(require('./controllers'));
app.use(bodyParser.json());
app.use(expressValidator([]));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var User      = require('./controllers/user.js');
var Company   = require('./controllers/company.js');
var Employee  = require('./controllers/employee.js');
var SellPoint = require('./controllers/sellpoint.js');
var Contest   = require('./controllers/contest.js');
var QR        = require('./controllers/qr.js');
var Prize     = require('./controllers/prize.js');

app.get('/user',        User.index);
app.get('/user/:id',    User.show);
app.post('/user',       User.create);
app.put('/user/:id',    User.update);
app.delete('/user/:id', User.delete);

app.get('/user/:id/contests', User.contests);
app.post('/user/:id/login', User.login);
app.post('/user/:id/logout', User.logout);

app.get('/company',        Company.index);
app.get('/company/:id',    Company.show);
app.post('/company',       Company.create);
app.put('/company/:id',    Company.update);
app.delete('/company/:id', Company.delete);

app.get('/company/:company_id/employee',        Employee.index);
app.get('/company/:company_id/employee/:id',    Employee.show);
app.post('/company/:company_id/employee',       Employee.create);
app.put('/company/:company_id/employee/:id',    Employee.update);
app.delete('/company/:company_id/employee/:id', Employee.delete);

app.get('/company/:company_id/sellpoint',        SellPoint.index);
app.get('/company/:company_id/sellpoint/:id',    SellPoint.show);
app.post('/company/:company_id/sellpoint',       SellPoint.create);
app.put('/company/:company_id/sellpoint/:id',    SellPoint.update);
app.delete('/company/:company_id/sellpoint/:id', SellPoint.delete);

app.get('/company/:company_id/contest',        Contest.index);
app.get('/company/:company_id/contest/:id',    Contest.show);
app.post('/company/:company_id/contest',       Contest.create);
app.put('/company/:company_id/contest/:id',    Contest.update);
app.delete('/company/:company_id/contest/:id', Contest.delete);

app.get('/company/:company_id/sellpoint/:sellpoint_id/QR',        QR.index);
app.get('/company/:company_id/sellpoint/:sellpoint_id/QR/:id',    QR.show);
app.post('/company/:company_id/sellpoint/:sellpoint_id/QR',       QR.create);
app.put('/company/:company_id/sellpoint/:sellpoint_id/QR/:id',    QR.update);
app.delete('/company/:company_id/sellpoint/:sellpoint_id/QR/:id', QR.delete);

app.get('/QR/:code/sellpoint', QR.sellpoint);

app.get('/company/:company_id/contest/:contest_id/prize',        Prize.index);
app.get('/company/:company_id/contest/:contest_id/prize/:id',    Prize.show);
app.post('/company/:company_id/contest/:contest_id/prize',       Prize.create);
app.put('/company/:company_id/contest/:contest_id/prize/:id',    Prize.update);
app.delete('/company/:company_id/contest/:contest_id/prize/:id', Prize.delete);

/*
var models = require('./models/');
models.sequelize
  .authenticate()
  .then(function () {
    console.log('Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });
*/

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
