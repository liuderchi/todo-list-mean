const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: [
            path.resolve('static/js', 'app.js'),
            path.resolve('static/js', 'todo-controller.js'),
            path.resolve('static/js', 'modal-controller.js'),
        ]
    },
    // entry: path.resolve('src', 'main.js'), // abs path
    output: {
        path: path.resolve('dist'), // abs path
        filename: 'bundle.js'
    }
};
