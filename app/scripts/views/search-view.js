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
            App.userModel.on('change', this.render, this);
        },

        beginSearch: function() {
            App.Vent.trigger('navigation:showMapView');
        },

        render: function() {
            console.log(App.userModel.toJSON());
            if(App.userModel.get('loggedIn') === false) {
                this.$el.html(new RegisterView().render().el);
            }
            else {
                this.$el.html(this.template({
                    loggedIn: App.userModel.get('loggedIn')
                }));
            }
            return this;
        }

    });

    return SearchView;

});
