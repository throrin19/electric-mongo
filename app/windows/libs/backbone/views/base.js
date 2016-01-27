'use strict';

const $             = require('jquery');
const _             = require('underscore');
const Backbone      = require('backbone');
const riot          = require('riot');
const viewManager   = require('../viewManager');

// chargement des tags communs
require('../../../components/raw.tag');

Backbone.$ = $;

module.exports = Backbone.View.extend({
    constructor : function constructor(options) {
        Backbone.View.apply(this, arguments);

        _.bindAll(this, 'mountTags', 'template', 'beforeRender', 'afterRender', '_mountBasicTags', 'createSubView', 'dispose');

        this.models         = options.models || {};
        this.collections    = options.collections || {};
        this.subviews       = {};
        this.name           = options.name;
        this.tags           = {};
        this.global         = viewManager;

        this._initGlobalEvents();

        this.render = _.wrap(this.render, function wrapRender(render) {
            this.beforeRender();
            render();
            this.afterRender();
            this._mountBasicTags();
            return this;
        }.bind(this));
    },
    /**
     * Permet de créer une sous vue et de la rattacher directement à cette vue-ci.
     *
     * @param   {string}            name                Nom de la vue. Attention si le nom existe déjà, l'ancienne vue est supprimée
     * @param   {object}            view                Vue Backbone
     * @param   {object}            [options]           Options à passer à la vue
     * @return  {object}                                Instance de la vue Backbone
     */
    createSubView : function createSubView(name, view, options) {
        var subView = viewManager.create(name, view, options);

        this.subviews[name] = subView;

        return subView;
    },
    /**
     * Permet de compiler un template en fonction des paramètres passés
     *
     * @param   {string}            template            Template à compiler
     * @param   {object}            [params]            Paramètres du template
     * @return  {string}                                Template compilé
     */
    template : function template(template, params) {
        var compile = _.template(template);

        return compile(params || {});
    },
    /**
     * Supprime la vue et tout ce qui s'y rapporte en événements et en tags
     */
    dispose : function dispose() {
        this.undelegateEvents();
        this.unbind();
        this.unmountAllTags();
        this._removeGlobalEvents();
        $(this.el).remove();
        this.remove();
        Backbone.View.prototype.remove.call(this);
    },
    /**
     * Permet de monter des tags RIOT dans notre vue
     *
     * @param   {object}            params              Paramètres
     * @param   {string}            params.tag          Tag à monter
     * @param   {string}            [params.selector]   Selecteur CSS valide (ex : 'div#monid > span')
     * @param   {domNode}           [params.domNode]    Node DOM qui sera remplacée par le tag à charger
     * @param   {object}            [params.options]    Options du tag
     * @return  {object[]}                              Liste des instances de tags montés. Null si rien n'est monté
     */
    mountTags : function mountTag(params) {
        var tags = null;

        if (_.isString(params.selector) && !_.isEmpty(params.selector)) {
            tags = riot.mount(this.el.querySelectorAll(params.selector), params.tag, params.options);
        } else if (!_.isEmpty(params.domNode)) {
            tags = riot.mount(params.domNode, params.tag, params.options);
        } else if (_.isEmpty(params.selector) && _.isEmpty(params.domNode)) {
            tags = riot.mount(this.el.querySelectorAll(params.tag), params.tag, params.options);
        }

        _.each(tags, function (tag) {
            this.tags[tag._riot_id] = tag;

            tag.on('unmount', function () {
                delete this.tags[tag._riot_id];
                tag = null;
            }.bind(this));
        }, this);

        this._initTagEvents(tags);

        return tags;
    },
    /**
     * Supprime tous les tags Riot de notre Vue
     */
    unmountAllTags : function unmountAllTags() {
        _.each(this.tags, function (tag) {
            riot.unmount(tag);
        });
    },
    /**
     * Monte tous les tags communs à toutes les vues parmis les suivants :
     *
     * - i18n
     */
    _mountBasicTags : function mountBasicTags() {
        this.mountTags({
            tag : 'i18n'
        });
    },
    /**
     * Initialise les events liés aux tags par rapport à ceux que l'on a renseigné à notre vue
     *
     * @param   {object[]}      tags                Riot Tags Collection
     */
    _initTagEvents : function initTagEvents(tags) {
        _.each(tags, function (tag) {
            if (!_.has(this.tagEvents, tag.root.localName)) {
                return;
            }

            var events = this.tagEvents[tag.root.localName];

            _.each(events, function (callback, key) {
                var eventParts  = key.split(' '),
                    event       = eventParts[0],
                    search      = eventParts.length > 1 ? eventParts[1] : null;

                if (!_.isEmpty(search)) {
                    var matches = 'matches';

                    if (_.isFunction(tag.root.webkitMatchesSelector)) {
                        matches = 'webkitMatchesSelector';
                    } else if (_.isFunction(tag.root.mozMatchesSelector)) {
                        matches = 'mozMatchesSelector';
                    } else if (_.isFunction(tag.root.msMatchesSelector)) {
                        matches = 'msMatchesSelector';
                    } else if (_.isFunction(tag.root.oMatchesSelector)) {
                        matches = 'oMatchesSelector';
                    }

                    if (!tag.root[matches](search)) {
                        return;
                    }
                }

                this[callback] = _.bind(this[callback], this);
                tag.on(event, function () {
                    var args = Array.prototype.slice.call(arguments);

                    args.unshift(tag);

                    this[callback].apply(this, args);
                }.bind(this));
            }, this);
        }, this);
    },
    _initGlobalEvents : function initGlobalEvents() {
        _.each(this.globalEvents, function (func, event) {
            this.global.on(event, this[func], this);
        }, this);
    },
    _removeGlobalEvents : function removeGlobalEvents() {
        _.each(this.globalEvents, function (func, event) {
            this.global.off(event, this[func], this);
        }, this);
    },
    // fonctions de base vides
    render          : function render() {},
    beforeRender    : function beforeRender() {},
    afterRender     : function afterRender() {}
});
