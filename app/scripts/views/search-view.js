/*global define*/
define([
    'backbone',
    'views/register-view',
    'hbs!tmpl/search-view'
], function(Backbone, RegisterView, Template) {

    'use strict';

    var SearchView = Backbone.View.extend({

        id: 'search-view',
        className: 'search-view',
        template: Template,

        events: {
            'click #search-button': 'beginSearch'
        },

        initialize: function() {
            window.App.userModel.on('change', this.render, this);
        },

        beginSearch: function() {
            window.App.Vent.trigger('navigation:showMapView');
        },

        render: function() {
            console.log(window.App.userModel.toJSON());
            if(window.App.userModel.get('loggedIn') === false) {
                this.$el.prepend(new RegisterView().render().el);
            }
            else {
                this.$el.append(this.template({
                    loggedIn: window.App.userModel.get('loggedIn')
                }));
            }
            return this;
        }

    });

    return SearchView;

});
