var express = require('express');
var User = require('../database/model/userModel');
var router = express.Router();

/* GET login listing. */
router.route('/').get(function(req, res, next) {
  res.render('login', {title:'login'});
}).post(function(req, res) {
  User.findByUid(req.body.username, function(err, doc) {
    if(err) {
      req.session.error = '网络错误！';
      res.send(500);
    } else if(!doc) {
      req.session.error = '用户不存在！';
      res.send(401);
    } else {
      if(req.body.password !== doc.password) {
        req.session.error = '密码错误！';
        res.send(401)
      } else {
        req.session.user = doc;
        res.send(200);
      }
    }
  })
});
module.exports = router;
