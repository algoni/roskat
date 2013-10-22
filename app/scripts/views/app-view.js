/*global define*/
define([
    'backbone',
    'config',
    'views/map-view',
    'views/menu-view',
    'views/search-view'
], function(Backbone, Config, MapView, MenuView, SearchView) {

    'use strict';

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            window.App.Vent.on('showMap', this.showMapView, this);
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
