'use strict';

const electron  = require('electron');
const remote    = electron.remote;

var _           = remote.require('underscore'),
    View        = remote.require('../libs/backbone/views/base'),
    tpl         = remote.require('tpl/index.html');

var subView = remote.require('./subView');

// tags
remote.require('components/examples/jumbotron.tag');

module.exports = View.extend({
    tagEvents : {
        jumbotron : {
            'click #testId' : 'clickAction'
        }
    },
    globalEvents : {
        'submitForm' : 'submitAction'
    },
    initialize : function initialize(options) {
        _.bindAll(this, 'render');
    },
    render : function render() {
        this.$el.html(this.template(tpl));

        this.mountTags({
            tag : 'jumbotron'
        });

        var view = this.createSubView('subview', subView);

        this.$el.append(view.render().$el);

        return this;
    },
    clickAction : function clickAction(tag) {
        tag.unmount();
        console.log(this);
    },
    submitAction : function submitAction() {
        console.log('submitAction');
    }
});
