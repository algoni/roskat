/*global define,google*/
define([
    'backbone',
    'config',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDbfKJsRw2KfCzcokEtcypyR2wWYAiZREE&sensor=false'
], function(Backbone, Config) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            // Kartan asetukset, keskitetään Tampereen keskustaan
            this.mapOptions = {
                center: new google.maps.LatLng(
                    Config.mapCenter.lat,
                    Config.mapCenter.lng
                ),
                zoom: Config.defaultZoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };

            // Kysytään käyttäjältä sijaintia
            navigator.geolocation.getCurrentPosition(this.handleLocationQuery.bind(this));
        },

        handleLocationQuery: function(position) {
            var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            // Haetaan käyttäjän lähellä olevat pisteet
            var bbox = this.calculateBoundingBox(userPosition, 10000);

            for (var i = bbox.length - 1; i >= 0; i--) {
                new google.maps.Marker({
                    position: bbox[i],
                    map: window.map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
            }


            // Käyttäjä kartalle
            new google.maps.Marker({
                position: userPosition,
                map: window.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });

        },

        calculateBoundingBox: function(position, distance) {
            var bbox = [];

            bbox[0] = position.getCoordWithDistanceAndAngle(distance, 45);
            bbox[1] = position.getCoordWithDistanceAndAngle(distance, 135);
            bbox[2] = position.getCoordWithDistanceAndAngle(distance, 225);
            bbox[3] = position.getCoordWithDistanceAndAngle(distance, 315);

            return bbox;
        },

        render: function() {
            window.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);

            var roskat = $.get('http://tampere.navici.com/tampere_wfs_geoserver/tampere_iris/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tampere_iris:WFS_ROSKIS&outputFormat=application/json&srsName=EPSG:4326', function() {
                for (var i = roskat.responseJSON.features.length - 1; i >= 0; i--)
                {
                    // Luodaan karttamerkki
                    var lat = roskat.responseJSON.features[i].geometry.coordinates[1];
                    var lng = roskat.responseJSON.features[i].geometry.coordinates[0];

                    new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: window.map
                    });
                }
            },'json');
        }
    });

    return AppView;
});
