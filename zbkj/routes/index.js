var express = require('express');
var router = express.Router();
// 地址栏输入地址时，用redirect或render,页面按钮提交表单前台跳转
// redirect会改变地址栏内容，render不会
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

module.exports = router;
