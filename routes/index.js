var express = require('express');
var router = express.Router();

var siteTitle = 'TV Programs';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: siteTitle });
});

router.get('/code', function(req, res, next) {
  res.render('code', { title: siteTitle+' - Code' });
});

router.get('/music', function(req, res, next) {
  res.render('music', { title: siteTitle+' - Music' });
});

module.exports = router;
