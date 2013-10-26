/*global define*/
define([
    'backbone',
    'config',
    'models/user',
    'views/map-view',
    'views/menu-view',
    'views/search-view',
    'views/register-view',
    'collections/users-collection'
], function(Backbone, Config, User, MapView, MenuView, SearchView, RegisterView, UsersCollection) {

    'use strict';

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            window.App.Vent.on('navigation:showMapView', this.showMapView, this);
            window.App.Vent.on('navigation:showMainView', this.showSearchView, this);
            window.App.userModel = new User({
                name: 'Ei kirjauduttu',
                points: 0,
                id: window.App.user.id
            });

            $.get('http://roskat-backend.herokuapp.com/user/check?id=' + window.App.user.id, function(res) {
                if( res.length === 0 ) {
                    this.render();
                }
                else {
                    window.App.userModel.set({
                        name: res[0].name,
                        id: window.App.user.id
                    });
                    $.get('http://roskat-backend.herokuapp.com/score/personal?user=' + res[0].name, function(res) {
                        if( res[0] ) {
                            window.App.userModel.set({
                                points: res[0].points,
                            });
                        }
                        window.App.userModel.set('loggedIn', true);
                        this.render();
                    }.bind(this));
                }
            }.bind(this));
        },

        render: function() {
            console.log('Render!');
            this.searchView = new SearchView();
            this.mapView = new MapView();
            this.el.appendChild(new MenuView({
                collection: new UsersCollection(),
                model: window.App.userModel
            }).render().el);
            this.el.appendChild(this.searchView.render().el);
            this.el.appendChild(this.mapView.render().el);
            this.mapView.drawMapCanvas();
            this.showSearchView();
            return this;
        },

        showSearchView: function() {
            this.searchView.$el.addClass('active');
            this.mapView.$el.removeClass('active');
        },

        showMapView: function() {
            this.searchView.$el.removeClass('active');
            this.mapView.$el.addClass('active');
        }

    });
});
