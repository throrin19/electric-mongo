'use strict';

const electron  = require('electron');
const remote    = electron.remote;
const _         = remote.require('underscore');
const $         = require('jquery');

module.exports = function validator(ParsleyValidator) {
    var validator = ParsleyValidator.addValidator('multi', function multi(value, requirement) {
        var group   = $('input[data-parsley-multi="'+ requirement +'"],textarea[data-parsley-multi="'+ requirement +'"]'),
            isEmpty = _.isEmpty(value),
            isValid = true;

        $(group).each(function (index, elem) {
            if (!_.isEmpty($(elem).val()) && isEmpty) {
                isValid = false;
            }
        });
        return isValid;
    }, 32);

    //_.each(config.locale.availables, function (locale) {
    //    validator.addMessage(locale, 'multi', langs.i18n('validatorMulti', { locale : locale }));
    //});
};
