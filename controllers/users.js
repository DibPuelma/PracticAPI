var user = require('../models/user')
var express = require('express')
var router = express.Router()

router.get('/hola', function (req, res) {
  user.create('Franco', 'Muñoz')
  res.send('<h1>hello world</h1>')
})

module.exports = router
