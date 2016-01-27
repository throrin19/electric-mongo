'use strict';

var _                   = require('underscore'),
    Backbone            = require('backbone');

module.exports = _.extend({
    backboneMapArray : {},
    /**
     * Créer une nouvelle vue Backbone et l'ajoute à la collection des vues
     *
     * @param {string}          name                Nom de la vue. Attention si le nom existe déjà, l'ancienne vue est supprimée
     * @param {object}          View                Vue Backbone
     * @param {object}          [options]           Options à passer à la vue
     * @return {object}                             Instance de la vue Backbone
     */
    create           : function create(name, View, options) {
        //if (!(View instanceof Backbone.View)) {
        //    throw new Error('The view is not a correct Backbone.View Object.');
        //}

        if (this.backboneMapArray[name] instanceof Backbone.View) {
            this.dispose(name);
        }

        options                 = options || {};
        options.name            = name;
        var view                = new View(options);

        view.name               = name;
        this.backboneMapArray[name]  = view;

        //mediator.publish('view:after:create:' + name);

        return view;
    },
    /**
     * Récupère une vue à partir de son nom. Si la vue n'existe pas, retourne `false`
     *
     * @param   {String}            name                    Nom de la vue à retourner
     * @return  {object|boolean}                            Instance de la vue ou false si rien n'est trouvé
     */
    get : function get(name) {
        if (typeof this.backboneMapArray[name] !== 'undefined') {
            return this.backboneMapArray[name];
        }
        return false;
    },
    /**
     * Supprime toutes les vues sauf celles passées en paramètre
     *
     * @param {string[]}    [without]               Tableau de vues à ne pas supprimer
     */
    disposeAll : function disposeAll(without) {
        _.each(this.backboneMapArray, function (view) {
            if (view instanceof Backbone.View) {
                if (without) {
                    if (_.indexOf(without, view.name) === -1) {
                        this.dispose(view.name);
                    }
                } else {
                    this.dispose(view.name);
                }
            }
        }, this);
    },
    /**
     * Supprime la vue passée en paramètre ainsi que toutes ses sous-vues
     *
     * @param {String}      name                    Nom de la vue à supprimer
     */
    dispose : function dispose(name) {
        var view = this.exist(name);

        if (view) {
            //mediator.publish('view:before:dispose:' + name);

            if (typeof view.subviews != 'undefined') {
                _.each(view.subviews, function (view) {
                    if (typeof view == 'string') {
                        this.dispose(view);
                    }else {
                        this.dispose(view.name);
                    }
                }, this);
            }
            if (view.collections) {
                delete view.collections;
            }
            if (view.models) {
                delete view.models;
            }

            view.dispose();

            delete this.backboneMapArray[name];

            //mediator.publish('view:after:dispose:' + name);
            //mediator.removeSubscriber(view.name);
        }
    },
    /**
     * Test si la vue passé en paramètre existe.
     *
     * @param   {string}        name                    Nom de la vue à trouver.
     * @return  {boolean}                               True : La vue existe. False sinon.
     */
    exist : function exist(name) {
        return this.backboneMapArray[name] instanceof Backbone.View;
    }
}, Backbone.Events);
