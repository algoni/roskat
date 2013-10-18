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

        render: function() {
            var searchView = new SearchView();
            this.el.appendChild(searchView.render().el);
            // var mapView = new MapView();
            // this.el.appendChild(mapView.render().el);
            // mapView.drawMapCanvas();
            return this;
        }

    });

    return AppView;
});
