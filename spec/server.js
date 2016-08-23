const request = require("request");
const url = require('url');

// var port = process.env.PORT || 3000;
// const base_url = 'http://127.0.0.1:' + port;
const base_url = 'http://demo-todo-mean.herokuapp.com/';


describe("todo list RESTful api server", () => {

  describe("GET home page /", () => {
    it("returns status code 200", (done) => {
      var options = {
        url: base_url,
        timeout: 5000
      };
      request.get(options, (error, response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  describe("GET /todos", () => {

    var _url = url.resolve(base_url, 'todos');

    describe("response data", () => {
      it("has field named tasks", (done) => {
        request.get(_url, (error, response, body) => {
          expect(JSON.parse(body).tasks).toBeDefined();
          done();
        });
      });

      describe("each task data", () => {
        it("has field named task_id, task, status", (done) => {
          request.get(_url, (error, response, body) => {
            var _body = JSON.parse(body);
            if (_body.tasks.length > 0){
              var _task = _body.tasks[0];
              expect(_task.task_id).toBeDefined();
              expect(_task.task).toBeDefined();
              expect(_task.status).toBeDefined();
            }
            done();
          });
        });
      });

    });
  });

  describe("POST DELETE /todos", () => {

    var _url = url.resolve(base_url, 'todos');
    var task_count = 0;
    var _task_id = '';

    beforeEach((done) => {
      request.get(_url, (error, response, body) => {
        task_count = JSON.parse(body).tasks.length;
        done();
      });
    });

    it("creating a new todo then delete it would change task quantity", (done) => {
      var data = {task: 'blablabla'};
      var option = {
        url: _url,
        json: data,
        timeout: 5000
      };

      request.post(option, (error, response) => {
        expect(response.statusCode).toBe(201);
        _task_id = response.body.task_id.toString();

        request.get(_url, (error, response, body) => {
          expect(JSON.parse(body).tasks.length).toBe(task_count + 1);

          request.delete(
          url.resolve(base_url, 'todos/' + _task_id), (error, response) => {
            expect(response.statusCode).toBe(200);

            request.get(_url, (error, response, body) => {
              expect(JSON.parse(body).tasks.length).toBe(task_count);
              done();

            });
          });
        });
      });
    });
  });

});
