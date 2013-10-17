/*global define*/
define([
    'backbone',
    'config',
    'views/map-view'
], function(Backbone, Config, MapView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        render: function() {
            var mapView = new MapView();
            this.el.appendChild(mapView.render().el);
            mapView.drawMapCanvas();
            return this;
        }

    });

    return AppView;
});
