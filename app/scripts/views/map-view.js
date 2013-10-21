/*global define*/
define([
    'backbone',
    'config',
    'models/trashcan',
    'views/trashcan-view',
    'views/map-controls-view',
    'collections/trashcans-collection',
    'leaflet'
], function(Backbone, Config, Trashcan, TrashcanView, ControlsView, TrashcansCollection, L) {
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
            var bbox =  this.calculateBoundingBox(position, range);
            $.get('http://roskat-backend.herokuapp.com/roskat/get',
            {
                x1: bbox[1][0],
                y1: bbox[1][1],
                x2: bbox[0][0],
                y2: bbox[0][1]
            }).done(function(data){
                data = JSON.parse(data);
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
            return bbox;
        },

        drawUser: function(position) {
            if( this.userMarker ) {
                this.userMarker.setLatLng(position);
            }
            else {
                this.userMarker =  new L.Marker(position, {
                    icon: new L.divIcon({
                        className: 'user-marker',
                        iconAnchor: new L.Point(5,5) // marker-elementin keskikohta koordinaatteina
                    })
                }).addTo(window.map);
            }
        },

        render: function() {
            this.$el.append(new ControlsView().render().el);
            return this;
        },

        locationFound: function(position) {
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
