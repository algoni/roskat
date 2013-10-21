/*global define*/
define([
    'backbone',
    'config',
    'views/map-view',
    'views/search-view'
], function(Backbone, Config, MapView, SearchView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            window.App.Vent.on('showMap', this.showMapView, this);
        },

        render: function() {
            var searchView = new SearchView();
            this.el.appendChild(searchView.render().el);
            return this;
        },

        showMapView: function() {
            var mapView = new MapView();
            this.$el.html(mapView.render().el);
            mapView.drawMapCanvas();
        }

    });

    return AppView;
});
