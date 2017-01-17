var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./controllers'))
app.use(bodyParser.json());

var models = require('./models/');
models.sequelize
  .authenticate()
  .then(function () {
    console.log('Connection successful');
  })
  .catch(function(error) {
    console.log("Error creating connection:", error);
  });

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
