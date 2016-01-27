'use strict';

const electron          = require('electron');
const remote            = electron.remote;
const Backbone          = remote.require('backbone');
const basicFunctions    = remote.require('./base');

remote.require('backbone.subroute');

var Router = Backbone.SubRoute.extend({

});

module.exports = Router.extend(basicFunctions);
