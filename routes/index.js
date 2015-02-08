
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Entry = mongoose.model('Entry');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/entries', function(req, res, next)
{
	Entry.find(function(err, entries){
		if(err){return next(err);}

		res.json(entries);
	});
});

router.post('/entries', function(req, res, next)
{
	var entry = new Entry(req.body);

	entry.save(function(err, post){
		if(err){return next(err);}

		res.json(post);
	})
})

module.exports = router;
