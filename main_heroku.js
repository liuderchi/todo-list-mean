'use babel'; // use babel transpiler

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var util = require( './util' );

var fakeData = {
  tasks: [
    {
      task:  "learn express",
      status: false,
      task_id: "qwerasdf"
    },
    {
      task:  "learn angular",
      status: true,
      task_id: "fdsarewq"
    }
  ]
};

app.use(bodyParser.json()); // REQUEST PARSER
app.use('/res', express.static('static'));  // NOTE access via /res/js/app.js


// ROUTING
app.route(/^\/(home)/)
  .get((req, res) => {
    res.status(200).sendFile('index.html', { root: path.join('.', 'static') }); // root file
  });


app.route('/')
  .get((req, res) => {
    return res.status(200).send(fakeData);
  })
  .post((req, res) => {
    // curl -X POST -H "Content-Type: application/json"  -d '{"task":"yes","status":true}' -w "\n"  http://localhost:3000/

    _task = JSON.parse(JSON.stringify(req.body));
    _task.task_id = util.makeid();

    if (fakeData.tasks.length >= 30) {
      return res.status(403).send({result:'failed', message:'reached limit of 30 tasks.'});
    }

    // NOTE use fakeData
    fakeData.tasks.push({
      task_id: _task.task_id,
      task: _task.task,
      status: false
    })
    return res.status(201).send({});
  });


app.route(/^\/(\w+)/)
  .put((req, res) => {
    // curl -X PUT -H "Content-Type: application/json"  -d '{"task":"NewTask","status":true}' -w "\n"  http://localhost:3000/t_id

    var target_task_id = req.params[0]

    // NOTE use fakeData
    for (task of fakeData.tasks) {
      if (task.task_id === target_task_id){
        task.task = req.body.task;
        task.status = req.body.status;
        return res.status(200).send({result: "ok"});
      }
    }
    return res.status(404).send('NOT FOUND');
  })
  .delete((req, res) => {
    // curl -X DELETE -H "Content-Type: application/json" -w "\n"  http://localhost:3000/t_id

    var target_task_id = req.params[0]

    // NOTE use fakeData
    for (t in fakeData.tasks) {
      if (fakeData.tasks[t].task_id === target_task_id){
        fakeData.tasks.splice(t, 1);
        return res.status(200).send({result: "ok"});
      }
    }
    return res.status(404).send('NOT FOUND');
  });


app.use( (req, res, next) => {  // default request handle (should put in bottom)
  return res.status(404).send('NOT FOUND');
});


// MAIN
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port', port);
});
