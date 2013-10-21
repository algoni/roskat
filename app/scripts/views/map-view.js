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
            // Kartan asetukset, keskitetään käyttäjään
            this.mapOptions = {
                attributionControl: false,
                zoomControl: false,
                disableDefaultUI: true
            };
            window.App.Vent.on('locationCheckRequested', this.checkIfFound, this);
        },

        checkIfFound: function() {
            if( !this.closestTrashcan ) {
                return;
            }
            var closestLatLng = new L.LatLng(this.closestTrashcan.model.get('position').lat, this.closestTrashcan.model.get('position').lng);
            var distance = this.userPosition.distanceTo(closestLatLng); // Etäisyys lähimpään roskakoriin metreinä
            if(distance <= Config.correctAnswerDistance) {
                console.log('Oikein!');
            }
            else {
                console.log('Liian kaukana! Etäisyys ' + distance + ' metriä.');
            }
        },

        drawNearestTrashcans: function(position, distance) {
            var bbox = [
                position.getCoordWithDistanceAndAngle(distance, 45),
                position.getCoordWithDistanceAndAngle(distance, 225)
            ];
            this.trashcans = new TrashcansCollection();
            this.trashcans.fetch({data: {
                x1: bbox[1][0],
                y1: bbox[1][1],
                x2: bbox[0][0],
                y2: bbox[0][1]
            }});
            this.trashcans.on('sync', function() {
                if(this.closestTrashcan) {
                    this.closestTrashcan.remove();
                }
                this.closestTrashcan = new TrashcanView({
                    model: this.trashcans.getClosest(position)
                }).render();
            }, this);
        },

        calculateBbox: function(position, distance) {
            return [
                position.getCoordWithDistanceAndAngle(distance, 45),
                position.getCoordWithDistanceAndAngle(distance, 225)
            ];
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
