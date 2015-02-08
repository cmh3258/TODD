
var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	title: String,
	description: String,
	upvotes: {type:Number, default: 0},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Entry', EntrySchema);