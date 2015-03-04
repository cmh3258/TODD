
var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	title: String,
	description: String,
  provider_link: String,
  website: String,
	upvotes: {type:Number, default: 0},
  created_at: {type: Date},
  updated_at: {type: Date},
  user_created: String,
  board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

EntrySchema.methods.upvote = function(cb){
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Entry', EntrySchema);