var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var User      = require('./controllers/user.js');
var Company   = require('./controllers/company.js');
var Employee  = require('./controllers/employee.js');
var SellPoint = require('./controllers/sellpoint.js');
var Contest   = require('./controllers/contest.js');
var QR        = require('./controllers/qr.js');
var Prize     = require('./controllers/prize.js');

app.use(require('./controllers'));
app.use(bodyParser.json());

app.post('/user',            User.index);
app.post('/user/:id',        User.show);
app.post('/user/:id/new',    User.create);
app.post('/user/:id/update', User.update);
app.post('/user/:id/delete', User.delete);

app.post('/company',            Company.index);
app.post('/company/:id',        Company.show);
app.post('/company/:id/new',    Company.create);
app.post('/company/:id/update', Company.update);
app.post('/company/:id/delete', Company.delete);

app.post('/company/:companyId/employee',            Employee.index);
app.post('/company/:companyId/employee/:id',        Employee.show);
app.post('/company/:companyId/employee/:id/new',    Employee.create);
app.post('/company/:companyId/employee/:id/update', Employee.update);
app.post('/company/:companyId/employee/:id/delete', Employee.delete);

app.post('/company/:companyId/sellpoint',            SellPoint.index);
app.post('/company/:companyId/sellpoint/:id',        SellPoint.show);
app.post('/company/:companyId/sellpoint/:id/new',    SellPoint.create);
app.post('/company/:companyId/sellpoint/:id/update', SellPoint.update);
app.post('/company/:companyId/sellpoint/:id/delete', SellPoint.delete);

app.post('/company/:companyId/contest',            Contest.index);
app.post('/company/:companyId/contest/:id',        Contest.show);
app.post('/company/:companyId/contest/:id/new',    Contest.create);
app.post('/company/:companyId/contest/:id/update', Contest.update);
app.post('/company/:companyId/contest/:id/delete', Contest.delete);

app.post('/company/:companyId/QR',            QR.index);
app.post('/company/:companyId/QR/:id',        QR.show);
app.post('/company/:companyId/QR/:id/new',    QR.create);
app.post('/company/:companyId/QR/:id/update', QR.update);
app.post('/company/:companyId/QR/:id/delete', QR.delete);

app.post('/company/:companyId/contest/:contestId/prize',            Prize.index);
app.post('/company/:companyId/contest/:contestId/prize/:id',        Prize.show);
app.post('/company/:companyId/contest/:contestId/prize/:id/new',    Prize.create);
app.post('/company/:companyId/contest/:contestId/prize/:id/update', Prize.update);
app.post('/company/:companyId/contest/:contestId/prize/:id/delete', Prize.delete);

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
