'use strict';

const electron  = require('electron');
const remote    = electron.remote;

var _           = remote.require('underscore'),
    View        = remote.require('../libs/backbone/views/base'),
    tpl         = remote.require('tpl/subView.html');


module.exports = View.extend({
    tagName     : 'nav',
    className   : 'navbar navbar-inverse navbar-fixed-top',
    events      : {
        'submit form' : 'submitAction'
    },
    initialize  : function initialize() {
        _.bindAll(this, 'render');
    },
    render : function render() {
        this.$el.html(this.template(tpl));

        return this;
    },
    submitAction : function submitAction(evt) {
        evt.preventDefault();

        this.global.trigger('submitForm');
    }
});
