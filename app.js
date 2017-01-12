var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('./controllers'))
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
