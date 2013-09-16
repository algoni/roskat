/*global define,google*/
define([
    'backbone',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDbfKJsRw2KfCzcokEtcypyR2wWYAiZREE&sensor=false'
], function(Backbone) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.mapOptions = {
                center: new google.maps.LatLng(61.497803,23.763058),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        },

        render: function() {
            this.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
        }

    });

    return AppView;
});
