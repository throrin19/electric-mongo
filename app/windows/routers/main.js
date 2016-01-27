'use strict';

var $           = require('jquery'),
    Backbone    = require('backbone'),
    Router      = require('../libs/backbone/router/base.router'),
    viewManager = require('../libs/backbone/viewManager'),
    defaultView = require('../modules/index');

module.exports = Router.extend({
    routes : {
        ''              : 'indexAction',
        '(/)'           : 'indexAction',
        '*actions'      : 'notFoundAction'
    },
    initialize : function initialize() {
        console.log('Router started');
        Backbone.history.start({
            pushState : false
        });
    },
    indexAction : function indexAction() {
        var view = viewManager.create('pageContent', defaultView, {});

        $('body').html(view.render().$el);
    }
});
