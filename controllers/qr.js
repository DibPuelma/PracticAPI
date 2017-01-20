var util      = require('util');
var Company   = require('../models/').Company;
var SellPoint = require('../models/').SellPoint;
var QR        = require('../models/').QR;

var schema = {
  'code': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 1000 }] }
  }
};

var schemaUpdate = {
  'code': {
    optional: true,
    isLength: { options: [{ min: 1, max: 1000 }] }
  }
};

var filterParams = function(req) {
  var keys = Object.keys(schema);

  var data = {};
  for (var param in req.body)
    if (keys.indexOf(param) > -1) 
      data[param] = req.body[param];

  return data;
}

module.exports = {
  index(req, res) {
    QR.findAll({ where: { sell_point_id: req.params.sellpointId } }).then(function (QRs) {
      res.status(200).json(QRs);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      QR.findById(req.params.id).then(function (QR) {
        res.status(200).json(QR);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  },

  create(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      SellPoint.findById(req.params.sellpointId).then(function (sellpoint) {
        QR.create(data).then(function (newQR) {
          newQR.setSellPoint(sellpoint).then(function() {
            res.status(200).json(newQR);
          });
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkBody(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      SellPoint.findById(req.params.sellpointId).then(function (sellpoint) {
        QR.update(data, { where: { id: req.params.id } }).then(function (updatedQR) {
          res.status(200).json(updatedQR);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      QR.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (deletedQR) {
        res.status(200).json(deletedQR);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  }
};
