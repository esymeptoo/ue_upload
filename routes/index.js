var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addGoods', { title: '上传文件&&图片' });
});

module.exports = router;
