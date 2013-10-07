/*global define*/
define(['backbone', 'leaflet'], function(Backbone, L) {

    'use strict';

    var TrashcanView = Backbone.View.extend({

        render: function(markerIcon) {
            new L.Marker(this.model.get('position')).addTo(window.map);
            return this;
        }
    });

    return TrashcanView;

});
