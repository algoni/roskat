/*global define*/
define([
    'backbone',
    'hbs!tmpl/main-menu',
    'collections/users-collection'
], function(Backbone, Template, Users) {

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
            window.App.Vent.on('user:loggedIn', this.displayUserName, this);
            var topUsers = new Users();
            topUsers.fetch();
            topUsers.on('sync', function() {
                this.context.topUsers = topUsers.toJSON();
                this.render();
            }, this);
        },

        displayUserName: function() {
            this.context.currentUser = window.App.userModel.toJSON();
            this.render();
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
            this.el.innerHTML = this.template(this.context);
            return this;
        }

    });
});
