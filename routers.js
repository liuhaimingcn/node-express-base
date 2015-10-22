/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
//var controllers = require('./controllers');

// 首页
router.get('/', function (req, res) {
  res.render('index');
});

//// parkour
//// 添加地点
//router.post('/sites', controllers.site.addSite);
//// 查询所有地点
//router.get('/sites', controllers.site.getSites);
//// 删除对应的地点
//router.delete('/sites/:id', controllers.site.delSite);
//// 修改对应的地点
//router.put('/sites/:id', controllers.site.modifySite);


module.exports = router;