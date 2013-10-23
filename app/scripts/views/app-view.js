/*global define*/
define([
    'backbone',
    'config',
    'models/user',
    'views/map-view',
    'views/menu-view',
    'views/search-view',
    'views/register-view',
], function(Backbone, Config, User, MapView, MenuView, SearchView, RegisterView) {

    'use strict';

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            window.App.Vent.on('showMap', this.showMapView, this);
            $.get('http://roskat-backend.herokuapp.com/user/check?id=' + window.App.user.id, function(res) {
                if( res.length === 0 ) {
                    this.showRegisterForm();
                }
                else {
                    window.App.userModel = new User({
                        name: res[0].name,
                        id: window.App.user.id
                    });
                    $.get('http://roskat-backend.herokuapp.com/score/personal?user=' + res[0].name, function(res) {
                        if( res[0] ) {
                            window.App.userModel.set('points', res[0].points);
                        }
                        window.App.Vent.trigger('user:loggedIn');
                    }.bind(this));
                }
            }.bind(this));
        },

        showRegisterForm: function() {
            this.$el.append(new RegisterView().render().el);
        },

        render: function() {
            this.searchView = new SearchView();
            this.$el.append(new MenuView().render().el);
            this.el.appendChild(this.searchView.render().el);
            return this;
        },

        showMapView: function() {
            this.searchView.remove();
            this.mapView = new MapView();
            this.$el.append(this.mapView.render().el);
            this.mapView.drawMapCanvas();
        }

    });
});
