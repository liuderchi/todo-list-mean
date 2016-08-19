# Simple ToDo List App Using MEAN Stack

![Linux build status](https://api.travis-ci.org/liuderchi/todo-list-mean.svg?branch=master)

* It's a very simple to-do list app using __MEAN__ Stack (`MongoDB`, `express`, `AngularJS`, `Nodejs`).
* Currently hosted on https://demo-todo-mean.herokuapp.com/

* It supports `CRUD` operation to a todo task;
* Communication between browser and server is trying to be RESTful.


## RUN

### RUN LOCALLY

```bash
$ mongod  
    # if you don't have mongodb installed, use $ apt-get install mongodb
$ cd todo_list_mean

$ npm install
$ node main.js
```

now you can use this app via http://localhost:3000/home


### DEPLOY to HEROKU

#### Prerequisites for Heroku

  - Heroku toolbelt
  - An Heroku account
  - An _mLab MongoDB_ add-on set up. [(tutorial)](https://scotch.io/tutorials/use-mongodb-with-a-node-application-on-heroku)


```bash
$ heroku create
    # For the first time you deploy: create heroku app, heroku create git remote for you named 'heroku'

$ git push heroku HEAD:master
    # push current commit to remote then deploy automatically
    # NOTE heroku in default deploy only when you push to heroku/master

$ heroku ps:scale web=1  # specify hardware resource
$ heroku open            # browse website
```

  - other management commands

```bash
$ heroku logs            # view logs
$ heroku config | grep MONGODB_URI   # check heroku mongo uri
$ heroku rename NEW_APP_NAME         # rename app (optional)
$ git remote set-url heroku https://YOUR_NEW_HEROKU_GIT_REPO_URL.git
    # don't forget to update remote after renaming
```

now you can use this app via http://MY_HEROKU_APP_NAME.herokuapp.com/


## CHANGELOG


## TODO

- Add OAuth2
- Integrate with Test framework, add test script
- Add CI to automate testing
