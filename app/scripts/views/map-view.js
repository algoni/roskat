/*global define,google*/
define([
    'backbone',
    'config',
    'models/trashcan',
    'views/trashcan-view',
    'collections/trashcans-collection',
    'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDbfKJsRw2KfCzcokEtcypyR2wWYAiZREE&sensor=false'
], function(Backbone, Config, Trashcan, TrashcanView, TrashcansCollection) {
    'use strict';

    var MapView = Backbone.View.extend({

        id: 'map-canvas',

        initialize: function() {
            // Käyttäjän sijainti Google-koordinaatteina
            this.userPosition = new google.maps.LatLng(
                window.App.userPosition.lat,
                window.App.userPosition.lng
            );

            // Kartan asetukset, keskitetään käyttäjään
            this.mapOptions = {
                center: this.userPosition,
                zoom: Config.defaultZoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };

            // Haetaan roskakorit bounding boxin mukaan
            this.drawNearestTrashcans(this.userPosition, Config.bboxRadius);
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
                bbox: this.calculateBoundingBox(position, range) + ',EPSG:4326' // perään bboxin karttajärjestelmä (täytyy määrätä erikseen)
            }).done(function(data){
                this.trashcans = new TrashcansCollection();
                for (var i = data.features.length - 1; i >= 0; i--) {

                    // Luodaan uusi model
                    var model = new Trashcan({
                        position: new google.maps.LatLng(
                            data.features[i].geometry.coordinates[1],
                            data.features[i].geometry.coordinates[0]
                        ),
                        lat: data.features[i].geometry.coordinates[1],
                        lng: data.features[i].geometry.coordinates[0]
                    });

                    // Lisätään joukkoon
                    this.trashcans.add(model);

                    // Piirretään näkymä
                    new TrashcanView({
                        model: model
                    });
                }

                // Piirretään lähin roskis
                new TrashcanView({
                    model: this.trashcans.getClosest(this.userPosition)
                }).render();

            }.bind(this));
        },

        calculateBoundingBox: function(position, distance) {
            var bbox = [
                position.getCoordWithDistanceAndAngle(distance, 45),
                position.getCoordWithDistanceAndAngle(distance, 225)
            ];

            // Koordinaatit väärinpäin stringinä, koska WFS
            // bbox on muotoa y1,x1,y2,x2
            return bbox[1][1] + ',' + bbox[1][0] + ',' + bbox[0][1] + ',' + bbox[0][0];
        },

        render: function() {
            window.map = new google.maps.Map(this.el, this.mapOptions);

            // Käyttäjä kartalle
            new google.maps.Marker({
                position: this.userPosition,
                map: window.map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });

            return this;
        }
    });

    return MapView;
});
