/*global define*/
define([
    'backbone',
    'config',
    'models/user',
    'views/map-view',
    'views/menu-view',
    'views/search-view',
    'views/register-view',
    'views/completion-view',
    'collections/users-collection'
], function(Backbone, Config, User, MapView, MenuView, SearchView, RegisterView, CompletionView, UsersCollection) {

    'use strict';

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            App.Vent.on('navigation:showMapView', this.showMapView, this);
            App.Vent.on('navigation:showMainView', this.showSearchView, this);
            App.Vent.on('quest:completionRegistered', this.showCompletionView, this);
            App.userModel = new User({
                name: 'Ei kirjauduttu',
                points: 0,
                id: App.user.id
            });

            $.get('http://roskat-backend.herokuapp.com/user/check?id=' + App.user.id, function(res) {
                if( res.length === 0 ) {
                    this.render();
                }
                else {
                    App.userModel.set({
                        name: res[0].name,
                        id: App.user.id
                    });
                    $.get('http://roskat-backend.herokuapp.com/score/personal?user=' + res[0].name, function(res) {
                        if( res[0] ) {
                            App.userModel.set({
                                points: res[0].points,
                            });
                        }
                        App.userModel.set('loggedIn', true);
                        this.render();
                    }.bind(this));
                }
            }.bind(this));
        },

        render: function() {
            this.searchView = new SearchView();
            this.mapView = new MapView();
            this.el.appendChild(new MenuView({
                collection: new UsersCollection(),
                model: App.userModel
            }).render().el);
            this.el.appendChild(this.searchView.render().el);
            this.el.appendChild(this.mapView.render().el);
            this.mapView.drawMapCanvas();
            this.showSearchView();
            return this;
        },

        showCompletionView: function(quest) {
            this.searchView.$el.removeClass('active');
            this.mapView.$el.removeClass('active');
            this.el.appendChild(new CompletionView({quest: quest}).render().el);
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
