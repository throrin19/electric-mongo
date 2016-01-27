'use strict';

var $           = remote.require('jquery'),
    Backbone    = remote.require('backbone'),
    Router      = remote.require('libs/backbone/router/base.router'),
    viewManager = remote.require('libs/backbone/viewManager'),
    defaultView = remote.require('modules/index');

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
