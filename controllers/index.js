var express = require('express')
var router = express.Router()
var user = require('../models/user')

user.create('Franco', 'Muñoz')
router.get('/', function (req, res) {
  res.send('<h1>hello world</h1>')
})

module.exports = router
