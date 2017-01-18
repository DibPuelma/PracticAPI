var models = require('../models/'); // UNUSED

var User      = require('../models/').User;
var Company   = require('../models/').Company;
var Employee  = require('../models/').Employee;
var SellPoint = require('../models/').SellPoint;
var QR        = require('../models/').QR;
var Contest   = require('../models/').Contest;
var Prize     = require('../models/').Prize;

var express = require('express')
var router = express.Router()

router.get('/read', function(req, res) {

});

module.exports = router;
