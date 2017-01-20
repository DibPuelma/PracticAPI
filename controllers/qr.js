var Company = require('../models/company.js');
var QR      = require('../models/qr.js');

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
  var keys = schema.keys();

  var data = {};
  for (var param in req.body)
    if (keys.indexOf(param) > -1) 
      data[type] = req.body[param];

  return data;
}

module.exports = {
  index(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      QR.findAll().then(function (QRs) {
        res.status(200).json(QRs);
      }).catch(function (error) {
        res.status(500).json(error);
      });
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
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.findById(req.params.companyId).then(function (company) {
        QR.create(data).then(function (newQR) {
          newQR.setCompany(company).then(function() {
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
    req.checkParams(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.findById(req.params.companyId).then(function (company) {
        QR.update(data, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedQR) {
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
