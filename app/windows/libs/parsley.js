'use strict';

const _         = require('underscore');

var Parsley = window.Parsley;

module.exports = {
    init : function init() {
        this._extendConfig();
        this._initValidators();
    },
    _extendConfig : function extendConfig() {
        window.ParsleyConfig = {
            classHandler: function (el) {
                var result = el;
                if (el.$element.parent().hasClass('input-group')) {
                    result = el.$element.closest('.input-group');
                }
                return result;
            },
            errorsContainer : function (el) {
                return el.$element.closest('.form-group');
            }
        };
    },
    _initValidators : function initValidators() {
        if (!window.ParsleyValidator) {
            return;
        }

        var validators = [
            require('./parsley/multi')
        ];

        _.each(validators, function (validator) {
            validator(window.ParsleyValidator);
        });
    }
};
