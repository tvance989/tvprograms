var express = require('express');
var router = express.Router();

var title = 'TV Programs';

/* GET home page. */
router.get('/', function(req, res, next) {
	var projects = [];
	projects.push({title:'Gear Font', img:'http://simpleicon.com/wp-content/uploads/gear-2.svg', desc:'This is a font that looks like gears.', href:'/gears'});
	//projects.push({title:'Spot it! Deck Builder', img:'http://ecx.images-amazon.com/images/I/81DROJo7s0L._SL1500_.jpg', desc:'This tool lets you build your own Spot it! deck', href:'/spot-it'});
	//projects.push({title:'Disc Golf Scorecard', img:'http://rlv.zcache.co.nz/disc_golf_pole_hole_basket_icon_round_sticker-r870b5032ea6646ef876ac018cb544084_v9wth_8byvr_512.jpg', desc:'Keep track of your games and courses.', href:'/disc'});

  res.render('index', {
		title: title,
		projects: projects,
	});
});

router.get('/code', function(req, res, next) {
  res.render('code', { title: title+' - Code' });
});

router.get('/gears', function(req, res, next) {
  res.render('gears', { title: title+' - Gear Font' });
});

router.get('/music', function(req, res, next) {
  res.render('music', { title: title+' - Music' });
});

module.exports = router;
