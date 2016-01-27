'use strict';

const _         = require('underscore');
const View      = require('../libs/backbone/views/base');
const tpl       = require('../tpl/index.html');

// tags


module.exports = View.extend({
    className   : 'window',
    initialize  : function initialize(options) {
        _.bindAll(this, 'render');
    },
    render : function render() {
        this.$el.html(this.template(tpl));

        return this;
    }
});
