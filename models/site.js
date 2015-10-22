'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var siteSchema = new Schema({
  destination: String,//地点名称
  distance: String,//总距离
  difficulty: Number //难度等级
});

module.exports = mongoose.model('site', siteSchema, 'site');