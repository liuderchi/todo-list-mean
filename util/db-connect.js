var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Todo = new Schema({
  task_id    : String,
  task    : String,
  status : Boolean
});

mongoose.model('Todo', Todo);

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/todo';
// NOTE process.env.MONGODB_URI is for heroku env
console.log('making db connect to ', mongoUri);

mongoose.connect(mongoUri, (err) => {
  if (err) console.error(err);
  else console.log('mongo connected to:', mongoUri);
});
