# Simple ToDo List App Using MEAN Stack

It's a very simple to-do list app using moder web technologies.

- MongoDB v2.4.9
- express ^4.14.0,
- AngularJS v1.x
- Nodejs v4.4.7

Also it's feature including `CRUD` operation to a task;
Communicate between browser and server is trying to be _RESTful_.


## RUN

### RUN LOCALLY

```bash
$ mongod  # if you don't have mongodb installed, use $ apt-get install mongodb
$ cd todo_list_mean
$ npm install
$ node main.js
```

now you can use this app via http://localhost:3000/home


### DEPLOY to HEROKU

```bash
$ heroku create
    # create heroku app, heroku create git remote for you named 'heroku'

$ git push heroku yourbranch:master
    # push yourbranch to remote then deploy automatically
    # NOTE heroku in default deploy only when you push to heroku/master

$ heroku ps:scale web=1  # specify hardware resource
$ heroku open            # browse website
$ heroku logs

$ heroku rename NEW_APP_NAME         # rename app (optional)
$ git remote set-url heroku https://YOUR_NEW_HEROKU_GIT_REPO_URL.git
    # don't forget to update remote after renaming
```

now you can use this app via http://MY_HEROKU_APP_NAME.herokuapp.com/home



## CHANGELOG


## TODO
