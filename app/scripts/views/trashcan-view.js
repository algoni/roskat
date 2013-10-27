/*global define*/
define(['backbone', 'leaflet'], function(Backbone, L) {

    'use strict';

    var TrashcanView = Backbone.View.extend({

        render: function() {
            new L.Marker(this.model.get('position'), {
                icon: new L.divIcon({
                    className: 'trashcan-marker glyphicon glyphicon-trash',
                    iconAnchor: new L.Point(5,5) // marker-elementin keskikohta koordinaatteina
                })
            }).addTo(window.map);
            return this;
        }
    });

    return TrashcanView;

});
