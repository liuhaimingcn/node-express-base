'use strict';

var mongoose = require('mongoose');
var config = require('../config');
/**
 * 初始化数据库链接操作
 */
mongoose.connect(config.mongodb, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.mongodb, err.message);
    process.exit(1);
  }
});

exports.Site = require('./site');