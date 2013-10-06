/*global define,google*/
define(['backbone'], function(Backbone) {

    'use strict';

    var TrashcanView = Backbone.View.extend({

        render: function(markerIcon) {
            new google.maps.Marker({
                position: this.model.get('position'),
                map: window.map,
                icon: markerIcon
            });
            return this;
        }
    });

    return TrashcanView;

});
