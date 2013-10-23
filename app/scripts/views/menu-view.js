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

        events: {
            'click #menu-icon': 'toggleMenu',
            'click #back-icon': 'showMainView'
        },

        initialize: function() {
            window.App.Vent.on('user:loggedIn', this.displayUserName, this);
        },

        displayUserName: function(user) {
            console.log(user);
            this.render(user);
        },

        showMainView: function() {
            window.App.Vent.trigger('navigation:showMainView');
        },

        toggleMenu: function() {
            $('body').toggleClass('menu-active');
        },

        render: function(context) {
            context = context || {
                name: 'Ei kirjautunut'
            };
            this.el.innerHTML = this.template(context);
            return this;
        }

    });
});
