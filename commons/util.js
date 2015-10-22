/**
 * 工具类
 */
'use strict';

var config = require('../config');
var _extend = require('util')._extend;

exports.dateFormat = function dateFormat(date, fmt) {
  if (!date) {
    return '';
  }
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    date = new Date(date);
  }
  fmt = fmt || 'yyyy-MM-dd';
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

exports.log = function log(desc, data) {
  if (config.debug) {
    console.log(dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' ' + desc + ' ' + (typeof data === 'object'
        ? JSON.stringify(data) : data));
  }
};

exports.extend = _extend;