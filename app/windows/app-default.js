'use strict';

const electron  = require('electron');
const remote    = electron.remote;
const app       = remote.require('./init');

var $  = remote.require('jquery');

$(function () {
    app.initApp(function afterInit() {
        var Router = remote.require('./routers/main');

        new Router();
    });
});
