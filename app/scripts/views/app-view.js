/*global define,google*/
define([
    'backbone',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDbfKJsRw2KfCzcokEtcypyR2wWYAiZREE&sensor=false',
], function(Backbone) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            // Kartan asetukset, keskitetään Tampereen keskustaan
            this.mapOptions = {
                center: new google.maps.LatLng(61.497803,23.763058),
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        },

        render: function() {
            window.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);

            //
            var roskat = $.get('scripts/roskat.json', function() {
                console.log(roskat.responseJSON);

                for (var i = roskat.responseJSON.features.length - 1; i >= 0; i--)
                {
                    // Luodaan karttamerkki
                    var lat = roskat.responseJSON.features[i].geometry.coordinates[1];
                    var lng = roskat.responseJSON.features[i].geometry.coordinates[0];

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: window.map
                    });
                }
            },'json');

        }

    });

    return AppView;
});
