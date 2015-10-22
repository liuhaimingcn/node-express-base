'use strict';

/**
 * base Cotroller
 *
 */
var async = require('async');

exports.extendBase = function (service) {

  var controller = {};

  controller.__proto__ = {
    getById: function (req, res, next) {
      service.getById(req.params.id, function (err, data) {
        if (err) {
          return next(err);
        }
        res.sendData(data);
      });
    },
    save: function (req, res, next) {
      service.save(req.body, function (err, data) {
        if (err) {
          return next(err);
        }
        res.sendData(data);
      })
    },
    modifyById: function (req, res, next) {
      req.body._id = req.params.id;
      service.modifyById(req.body, function (err, data) {
        if (err) {
          return next(err);
        }
        res.sendData(data);
      })
    },
    getList: function (req, res, next) {
      async.parallel({
        list: function (cb) {
          service.find(req.query, res.pageParams, cb)
        },
        count: function (cb) {
          service.count(req.query, cb)
        }
      }, function (err, result) {
        if (err) {
          return next(err);
        }
        res.sendData(result.list, result.count);
      });
    }
  };

  return controller;
};