var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var expressValidator = require('express-validator');

app.use(require('./controllers'));
app.use(bodyParser.json());
app.use(expressValidator([]));

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

app.get('/company',        Company.index);
app.get('/company/:id',    Company.show);
app.post('/company',       Company.create);
app.put('/company/:id',    Company.update);
app.delete('/company/:id', Company.delete);

app.get('/company/:companyId/employee',        Employee.index);
app.get('/company/:companyId/employee/:id',    Employee.show);
app.post('/company/:companyId/employee',       Employee.create);
app.put('/company/:companyId/employee/:id',    Employee.update);
app.delete('/company/:companyId/employee/:id', Employee.delete);

app.get('/company/:companyId/sellpoint',        SellPoint.index);
app.get('/company/:companyId/sellpoint/:id',    SellPoint.show);
app.post('/company/:companyId/sellpoint',       SellPoint.create);
app.put('/company/:companyId/sellpoint/:id',    SellPoint.update);
app.delete('/company/:companyId/sellpoint/:id', SellPoint.delete);

app.get('/company/:companyId/contest',        Contest.index);
app.get('/company/:companyId/contest/:id',    Contest.show);
app.post('/company/:companyId/contest',       Contest.create);
app.put('/company/:companyId/contest/:id',    Contest.update);
app.delete('/company/:companyId/contest/:id', Contest.delete);

app.get('/company/:companyId/sellpoint/:sellpointId/QR',        QR.index);
app.get('/company/:companyId/sellpoint/:sellpointId/QR/:id',    QR.show);
app.post('/company/:companyId/sellpoint/:sellpointId/QR',       QR.create);
app.put('/company/:companyId/sellpoint/:sellpointId/QR/:id',    QR.update);
app.delete('/company/:companyId/sellpoint/:sellpointId/QR/:id', QR.delete);

app.get('/company/:companyId/contest/:contestId/prize',        Prize.index);
app.get('/company/:companyId/contest/:contestId/prize/:id',    Prize.show);
app.post('/company/:companyId/contest/:contestId/prize',       Prize.create);
app.put('/company/:companyId/contest/:contestId/prize/:id',    Prize.update);
app.delete('/company/:companyId/contest/:contestId/prize/:id', Prize.delete);

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
