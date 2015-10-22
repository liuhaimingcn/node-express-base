'use strict';

var _extends = require('../commons/util').extend;

exports.extendBase = function (model) {

  var service = {};

  service.__proto__ = {
    save: function (data, cb) {
      return model.create(data, cb);
    },
    getById: function (id, cb) {
      model.findById(id, cb);
    },
    modifyById: function (keeper, cb) {
      model.findById(keeper._id, function (err, doc) {
        if (err) {
          return cb(err);
        }
        if (doc) {
          doc = _extends(doc, keeper);
          doc.updated_at = Date.now();
          return doc.save(cb);
        }
        cb({status: 404, message: '数据不存在！'});
      });
    },
    find: function (conditions, pageParams, cb) {
      cb = arguments[arguments.length - 1];
      conditions.status = conditions.status || 1;
      var query = model.find(conditions);
      if (pageParams && pageParams.isPaging) {
        query.skip(pageParams.skip()).limit(pageParams.size);
      }
      query.sort({_id: -1}).exec(cb);
    },
    count: function (conditions, cb) {
      conditions.status = conditions.status || 1;
      model.count(conditions, cb);
    }
  };

  return service;
};