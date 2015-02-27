
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Entry = mongoose.model('Entry');
var Comment = mongoose.model('Comment');
var Board = mongoose.model('Board');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//get all boards
router.get('/boards', function(req, res, next){
	Board.find(function(err, boards){
		if(err){ return next(err);}

		console.log('boards: ', boards)
		/*
		for(var i=0; i< boards.length; i++)
		{
			console.log('id -> ', boards[i].id)
			console.log('get: ', getEntry(boards[i].id))
		}
		*/
		res.json(boards)
	});
});

//save a board
router.post('/boards', function(req,res,next){
	var board = new Board(req.body);

	board.save(function(err, board){
		if(err){return next(err)}

		res.json(board);
	});
});

// Preload post objects on routes with ':post'
router.param('board', function(req, res, next, id) {
  var query = Board.findById(id);

  query.exec(function (err, board){
    if (err) { return next(err); }
    if (!board) { return next(new Error("can't find board")); }

    req.board = board;
    return next();
  });
});

// Preload comment objects on routes with ':comment'
router.param('entry', function(req, res, next, id) {
  var query = Entry.findById(id);

  query.exec(function (err, entry){
    if (err) { return next(err); }
    if (!entry) { return next(new Error("can't find entry")); }

    req.entry = entry;
    return next();
  });
});

// Preload comment objects on routes with ':comment'
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }

    req.comment = comment;
    return next();
  });
});

//populate boards with its entries
//var getEntry = function(boardid)
//{
router.get('/boards/:board', function(req, res, next){
	req.board.populate('entries', function(err, board){
		res.json(board)
	})
})
//}

//get all entries
/*
router.get('/boards/:board/entries', function(req, res, next)
{
	Entry.find(function(err, entries){
		if(err){return next(err);}

		res.json(entries);
	});
});
*/

//save an entry
router.post('/boards/:board/entries', function(req, res, next)
{
	var entry = new Entry(req.body);
	entry.board = req.board;

	entry.save(function(err, board){
		if(err){return next(err);}

		req.board.entries.push(entry);
		req.board.save(function(err, board){
			if(err){return next(err);}

			res.json(entry);
		})
	})
})

//upvote an entry
/*
router.put('/entries/:entry/upvote', function(req, res, next){
	req.entry.upvote(function(err, entry){
		if(err){return next(err);}

		res.json(entry);
	});
});
*/

//save a comment
router.post('/entries/:entry/comments', function(req, res, next){
	var comment = new Comment(req.body);
	comment.entry = req.entry;

	comment.save(function(err, comment){
		if(err){return next(err);}

		req.entry.comments.push(comment);
		req.entry.save(function(err, entry){
			if(err){return next(err);}

			res.json(comment);
		});
	});
});


//populating entry with its comments
router.get('/entries/:entry', function(req, res, next){
	req.entry.populate('comments', function(err, entry){
		res.json(entry);
	});
});

module.exports = router;




