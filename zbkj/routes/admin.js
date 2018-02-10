var express = require('express');
var User = require('../database/model/userModel');
var router = express.Router();
router.get('/userList', function(req, res) {
    res.render('userList', { title: 'account' });
});
router.get('/logout', function(req, res) {
   req.session.user = null;
   req.session.error = null;
    res.redirect('/');
});
router.get('/userTable', function(req, res) {
    User.fetch(function(err, list) {
        res.json(list)
    })
});
router.post('/newUser', function(req, res) {
    var data = req.body;
    if(data.uid) {
        User.findByUid(data.uid, function(err, doc) {
            if(err) {
                req.session.error = '网络错误！';
                res.send(500);
            } else if(doc) {
                req.session.error = '用户已存在！';
                res.send(304);
            } else {
                var userEntity = new User({
                    uid: data.uid,
                    password: data.password,
                    name: data.name,
                    level: data.level,
                    status: data.status
                });
                userEntity.save(function(err, doc) {
                    if(err) {
                        req.session.error = '添加失败！';
                        res.send(500);
                    } else {
                        res.send(200);
                    }
                })
            }
        })
    }
});
router.post('/removeUser', function(req, res) {
    var data = req.body._ids;
    var _ids = data.split(',');
    if(_ids.length > 0) {
        User.removeMany(_ids, function(err, rst) {
            if(err) {
                req.session.error = '网络错误，删除失败！';
                res.send(500);
            } else {
                res.send(200);
            }
        })
    }
});
router.post('/updateUser', function(req, res) {
   var doc = req.body;
   var _id = doc._id;
   delete doc._id;
   if(_id) {
       User.updateById(_id, doc, function(err, rst) {
           if(err) {
               req.session.error = '网络错误，更新失败！';
               res.send(500);
           } else {
               res.send(200);
           }
       })
   }
});
module.exports = router;
