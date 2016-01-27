'use strict';

const electron          = require('electron');
const remote            = electron.remote;
const Backbone          = remote.require('backbone');
const basicFunctions    = remote.require('./base');

var Router = Backbone.Router.extend({

});

module.exports = Router.extend(basicFunctions);