var Company = require('../models/company.js');

var schema = {
  'email': {
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
};

module.exports = {
  index(req, res) {
    Company.findAll().then(function (companies) {
      res.status(200).json(companies);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Company.findById(req.params.id).then(function (company) {
      res.status(200).json(company);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      Company.create(req.body).then(function (newCompany) {
        res.status(200).json(newCompany);
      }).catch(function (error){
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      Company.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(function (updatedCompany) {
        res.status(200).json(updatedCompany);
      }).catch(function (error){
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (deletedCompany) {
      res.status(200).json(deletedCompany);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }
};
