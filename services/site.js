'use strict';

var SiteModel = require('../models').Site;
var siteService = require('./_base').extendBase(SiteModel);

siteService.addSite = function (info, cb) {
  SiteModel.create({
    destination: info.destination,
    distance: info.distance,
    difficulty: info.difficulty
  }, cb);
};

siteService.getSites = function (cb) {
  SiteModel.find(null, null, cb);
};

siteService.delSite = function (id, cb) {
  SiteModel.findByIdAndRemove(id, cb);
};

siteService.modifySite = function (id, params, cb) {
  SiteModel.findByIdAndUpdate(id, params, cb);
};

module.exports = siteService;