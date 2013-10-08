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
        tagName: 'div',

        initialize: function() {
            // Käyttäjän sijainti Google-koordinaatteina

            // Kartan asetukset, keskitetään käyttäjään
            this.mapOptions = {
                attributionControl: false,
                zoomControl: false,
                disableDefaultUI: true
            };

            // Haetaan roskakorit bounding boxin mukaan
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
                bbox: this.calculateBoundingBox(position, range) + ',EPSG:4326' // perään bboxin karttajärjestelmä
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

        drawUser: function(position) {
            new L.Marker(position, {
                icon: new L.divIcon({
                    className: 'user-marker',
                    iconAnchor: new L.Point(5,5) // marker-elementin keskikohta koordinaatteina
                })
            }).addTo(window.map);
        },

        render: function() {
            return this;
        },

        locationFound: function(position) {
            console.log(position);
            this.userPosition = position.latlng;
            this.drawUser(position.latlng);
            this.drawNearestTrashcans(position.latlng, Config.bboxRadius);
        },

        drawMapCanvas: function() {
            window.map = L.map(this.el, this.mapOptions);


            L.tileLayer('http://{s}.tile.cloudmade.com/c3cc91391a2647e5a229c9ab6e4fe136/110137/256/{z}/{x}/{y}.png')
            .addTo(window.map);
            window.map.locate({
                setView: true,
                maxZoom: Config.defaultZoom,
                watch: true,
                maximumAge: 4000
            });
            window.map.on('locationfound', this.locationFound, this);
        }
    });

    return MapView;
});
