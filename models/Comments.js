
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	name: String,
	description: String, 
	upvotes: {type: Number, default: 0},
	entry: {type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }
});

mongoose.model('Comment', CommentSchema);