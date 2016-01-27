'use strict';

const parsley   = require('./libs/parsley');

module.exports = {
    initApp : function initApp(callback) {
        this.initGlobals();
        this.extendjQuery();
        this.initDomTools();
        //parsley.init();

        callback();
    },
    extendjQuery : function extendjQuery() {
        var $ = require('jquery');

        $.support.cors = true;

        // form2js pour $('form').toObject();
        //remote.require('form2js');
        //remote.require('jquery.form2js');
        require('parsleyjs');
    },
    initDomTools : function initDomTools() {

    },
    initGlobals : function initGlobals() {
        //global.jQuery       = remote.require('jQuery');
    }
};
