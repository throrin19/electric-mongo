'use strict';

const path      = require('path');
const app       = require(path.join(__dirname, '../windows', 'init'));

var $  = require('jquery');

$(function () {
    app.initApp(function afterInit() {
        var Router = require(path.join(__dirname, '../windows/routers', 'main'));

        new Router();
    });
});
