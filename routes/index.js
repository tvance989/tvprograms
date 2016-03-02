var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TV Programs' });
});

router.get('/music', function(req, res, next) {
  res.render('music', { title: 'TV Programs - Music' });
});

module.exports = router;
