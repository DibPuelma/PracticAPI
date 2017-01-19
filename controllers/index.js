var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

// router.use('/users', require('./users'));
// router.use('/seeds', require('./seeds'));

module.exports = router;
