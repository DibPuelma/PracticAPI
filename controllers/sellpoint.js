var Company   = require('../models/company.js');
var SellPoint = require('../models/sellpoint.js');

var schema = {
  'location': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid location'
  }
};

module.exports = {
  index(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      SellPoint.findAll().then(function (sellpoints) {
        res.status(200).json(sellpoints);
      }).catch(function (error) {
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  },

  show(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      SellPoint.findById(req.params.id).then(function (sellpoint) {
        res.status(200).json(sellpoint);
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
      Company.findById(req.params.companyId).then(function (company) {
        SellPoint.create(req.body).then(function (newSellPoint) {
          res.status(200).json(newSellPoint);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      Company.findById(req.params.companyId).then(function (company) {
        SellPoint.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedSellPoint) {
          res.status(200).json(updatedSellPoint);
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
      SellPoint.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (deletedSellPoint) {
        res.status(200).json(deletedSellPoint);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  }
};
