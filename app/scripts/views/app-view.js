/*global define*/
define([
    'backbone',
    'config',
    'views/map-view'
], function(Backbone, Config, MapView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            // Kysytään käyttäjältä sijaintia
            navigator.geolocation.getCurrentPosition(
                this.saveUserLocation.bind(this), // success
                this.noGeolocation.bind(this) // failure
            );
        },

        noGeolocation: function() {
            // Syystä tai toisesta käyttäjän sijaintia ei saatu, leikitään että käyttäjä on keskustassa
            window.App.userPosition = {
                lat: 61.498048,
                lng: 23.763328
            };
            this.render();
        },

        saveUserLocation: function(position) {
            window.App.userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                // debug: käyttäjä Hervannan keskustaan
                // lat: 61.44724,
                // lng: 23.849595
            };
            this.render();
        },

        render: function() {
            var mapView = new MapView();
            this.el.appendChild(mapView.render().el);
            mapView.drawMapCanvas();
            return this;
        }

    });

    return AppView;
});
