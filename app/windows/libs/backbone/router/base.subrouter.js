'use strict';

const Backbone          = require('backbone');
const basicFunctions    = require('./base');

require('backbone.subroute');

var Router = Backbone.SubRoute.extend({

});

module.exports = Router.extend(basicFunctions);
