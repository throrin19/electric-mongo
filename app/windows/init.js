'use strict';

const electron  = require('electron');
const remote    = electron.remote;
const FC        = remote.require('fastclick');
const parsley   = remote.require('libs/parsley');

module.exports = {
    initApp : function initApp(callback) {
        this.initGlobals();
        this.extendjQuery();
        this.initDomTools();
        parsley.init();

        callback();
    },
    extendjQuery : function extendjQuery() {
        var $ = remote.require('jquery');

        $.support.cors = true;

        // form2js pour $('form').toObject();
        //remote.require('form2js');
        //remote.require('jquery.form2js');
        remote.require('parsleyjs');
    },
    initDomTools : function initDomTools() {
        // lancement de fastclick
        new FC(document.body);
    },
    initGlobals : function initGlobals() {
        //global.jQuery       = remote.require('jQuery');
    }
};
