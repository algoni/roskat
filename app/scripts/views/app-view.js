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
            // var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var userPosition = new google.maps.LatLng(61.44724,23.849595);

            // Käyttäjä kartalle
            var userMarker = new google.maps.Marker({
                position: userPosition,
                map: window.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });

            // Keskitetään kartta käyttäjään
            window.map.panTo(userMarker.getPosition());

            // Haetaan roskakorit bounding boxin mukaan
            this.drawNearestTrashcans(userPosition, Config.bboxRadius);
        },

        drawNearestTrashcans: function(position, range) {
            $.get('http://tampere.navici.com/tampere_wfs_geoserver/tampere_iris/ows',
            {
                service: 'WFS',
                version: '2.0.0',
                request: 'GetFeature',
                typeName: 'tampere_iris:WFS_ROSKIS',
                outputFormat: 'application/json',
                srsName: 'EPSG:4326',
                bbox: this.calculateBoundingBox(position, range) + ',EPSG:4326'
            }).done(function(data){
                for (var i = data.features.length - 1; i >= 0; i--) {
                    new google.maps.Marker({
                        position: new google.maps.LatLng(
                            data.features[i].geometry.coordinates[1],
                            data.features[i].geometry.coordinates[0]
                        ),
                        map: window.map
                    });
                }
            });
        },

        calculateBoundingBox: function(position, distance) {
            var bbox = [
                position.getCoordWithDistanceAndAngle(distance, 45),
                position.getCoordWithDistanceAndAngle(distance, 225)
            ];

            // Koordinaatit väärinpäin stringinä, koska WFS
            // muotoa y1,x1,y2,x2
            return bbox[1][1] + ',' + bbox[1][0] + ',' + bbox[0][1] + ',' + bbox[0][0];
        },

        render: function() {
            window.map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
        }
    });

    return AppView;
});
