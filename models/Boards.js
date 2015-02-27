
var mongoose = require('mongoose');

var BoardSchema = new mongoose.Schema({
  name: String,
  description: String,
  created_at: {type: Date},
  updated_at: {type: Date},
  entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
});

/*
BoardSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
*/

mongoose.model('Board', BoardSchema);



/*
boards:[{
        name: 'First Board',
        description: 'sampling desc board',
        date:'',
        id:0,
        entries : []
    }]};
*/