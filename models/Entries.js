
var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	title: String,
	description: String,
	upvotes: {type:Number, default: 0},
  board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

EntrySchema.methods.upvote = function(cb){
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Entry', EntrySchema);