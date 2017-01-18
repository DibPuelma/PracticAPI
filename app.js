var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var poll = require('./controllers/poll.js');

// app.use(require('./controllers'));
app.use(bodyParser.json());
app.post('/poll', poll.create);
app.get('/poll/:id', poll.show);
app.get('/poll/company/:company_id', poll.indexByCompany)
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
