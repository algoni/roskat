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
            this.searchView = new SearchView();
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

    return AppView;
});
