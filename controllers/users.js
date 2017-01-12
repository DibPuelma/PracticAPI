var user = require('../models/user')
var express = require('express')
var router = express.Router()

router.post('/new', function (req, res) {
  console.log(req.body);
  user.create(req.body.name, req.body.lastName)
  res.send('<h1>hello world</h1>')
})

module.exports = router
