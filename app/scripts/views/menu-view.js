/*global define*/
define([
    'backbone',
    'hbs!tmpl/main-menu'
], function(Backbone, Template) {

    'use strict';

    return Backbone.View.extend({

        className: 'main-navigation',
        tagName: 'nav',
        template: Template,
        context: {},

        events: {
            'click #menu-icon': 'toggleMenu',
            'click #back-icon': 'showMainView'
        },

        initialize: function() {
            this.collection.fetch();
            window.App.Vent.on('quest:completionRegistered', this.render, this);
            this.model.on('change', this.render, this);
            this.collection.on('sync', this.render, this);
        },

        showMainView: function() {
            window.App.Vent.trigger('navigation:showMainView');
        },

        toggleMenu: function() {
            $('body').toggleClass('menu-active');
        },

        render: function() {
            this.context.currentUser = this.context.currentUser || {
                name: 'Ei kirjautunut'
            };
            this.el.innerHTML = this.template({
                currentUser: this.model.toJSON(),
                topUsers: this.collection.toJSON()
            });
            return this;
        }

    });
});
