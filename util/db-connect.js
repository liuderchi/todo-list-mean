var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Todo = new Schema({
  task_id    : String,
  task    : String,
  status : Boolean
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodb://localhost/todo');
