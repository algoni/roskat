/*global define*/
define([
    'backbone',
    'config',
    'models/trashcan',
    'views/trashcan-view',
    'collections/trashcans-collection',
    'leaflet'
], function(Backbone, Config, Trashcan, TrashcanView, TrashcansCollection, L) {
    'use strict';

    var MapView = Backbone.View.extend({

        id: 'map-canvas',

        initialize: function() {
            // Käyttäjän sijainti Google-koordinaatteina
            this.userPosition = new L.LatLng(
                window.App.userPosition.lat,
                window.App.userPosition.lng
            );

            // Kartan asetukset, keskitetään käyttäjään
            this.mapOptions = {
                center: this.userPosition,
                zoom: Config.defaultZoom,
                attributionControl: false,
                zoomControl: false,
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
                        position: new L.LatLng(
                            data.features[i].geometry.coordinates[1],
                            data.features[i].geometry.coordinates[0]
                        )
                    });

                    // Lisätään joukkoon
                    this.trashcans.add(model);
                }

                // Piirretään lähin roskis
                new TrashcanView({
                    model: this.trashcans.getClosest(window.App.userPosition)
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

        drawUser: function() {
            new L.Marker(this.userPosition, {
                icon: new L.divIcon({
                    className: 'user-marker',
                    iconAnchor: new L.Point(5,5)
                })
            }).addTo(window.map);
        },

        render: function() {
            return this;
        },

        drawMapCanvas: function() {
            window.map = L.map(this.el, this.mapOptions);
            L.tileLayer('http://{s}.tile.cloudmade.com/c3cc91391a2647e5a229c9ab6e4fe136/110089/256/{z}/{x}/{y}.png', {
                maxZoom: 18
            }).addTo(window.map);

            this.drawUser();
        }
    });

    return MapView;
});
