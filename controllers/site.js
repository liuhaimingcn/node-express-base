'use strict';

var siteService = require('../services').site;
var util = require('../commons/util');
var siteController = require('./_base').extendBase(siteService);

siteController.addSite = function (req, res, next) {
  var info = {
    destination: req.body.destination,
    distance: req.body.distance,
    difficulty: req.body.difficulty
  };

  siteService.addSite(info, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(util.resultFormat(data));
  });
};

siteController.getSites = function (req, res, next) {
  siteService.getSites(function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(util.resultFormat(data));
  });
};

siteController.delSite = function (req, res, next) {
  siteService.delSite(req.params.id, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(util.resultFormat(data));
  });
};

siteController.modifySite = function (req, res, next) {
  siteService.modifySite(req.params.id, req.body, function (err, data) {
    if (err) {
      return next(err);
    }
    res.send(util.resultFormat(data));
  });
};

module.exports = siteController;