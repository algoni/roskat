/*global define*/
define([
    'backbone',
    'config',
    'models/trashcan',
    'views/trashcan-view',
    'views/map-controls-view',
    'collections/trashcans-collection',
    'hbs!tmpl/mapview',
    'leaflet'
], function(Backbone, Config, Trashcan, TrashcanView, ControlsView, TrashcansCollection, Template, L) {
    'use strict';

    var MapView = Backbone.View.extend({

        id: 'map-view',
        className: 'map-view',
        template: Template,

        initialize: function() {
            // Kartan asetukset, keskitetään käyttäjään
            this.mapOptions = {
                attributionControl: false,
                zoomControl: false,
                disableDefaultUI: true
            };
            window.App.Vent.on('locationCheckRequested', this.checkDistanceToTarget, this);
        },

        checkDistanceToTarget: function() {
            if( !this.closestTrashcan ) {
                console.log('Ei lähintä olemassa.');
                return;
            }
            var closestLatLng = new L.LatLng(this.closestTrashcan.model.get('position').lat, this.closestTrashcan.model.get('position').lng);
            var distance = this.userPosition.distanceTo(closestLatLng); // Etäisyys lähimpään roskakoriin metreinä
            if(distance <= Config.correctAnswerDistance) {
                window.App.Vent.trigger('user:targetFound', {found: true});
            }
            else {
                distance = Math.ceil(distance);
                window.App.Vent.trigger('user:targetTooFar', {distance: distance});
            }
        },

        drawNearestTrashcan: function(position, distance) {
            var bbox = this.calculateBbox(position, distance);
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
                this.checkDistanceToTarget();
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
            this.el.innerHTML = this.template();
            this.$el.append(new ControlsView().render().el);
            return this;
        },

        initCurrentLocation: function(event) {
            console.log(event);
            this.userPosition = event.latlng;
            this.drawNearestTrashcan(this.userPosition, Config.bboxRadius);
            // Rajataan kartta siten, että lähin roskakori on aina näkyvissä
            window.map.fitBounds(this.calculateBbox(this.userPosition, Config.bboxRadius));

            // Nyt voidaan piirtää käyttäjä joka kerta, kun sijainti päivittyy
            this.drawUser(this.userPosition);
            window.map.on('locationfound', this.updateApplicationState, this);
        },

        updateApplicationState: function(event) {
            console.log(event);
            this.userPosition = event.latlng;
            this.drawUser(this.userPosition);
            window.App.Vent.trigger('locationCheckRequested');
        },

        drawMapCanvas: function() {
            window.map = L.map('map-canvas', this.mapOptions);
            L.tileLayer('http://{s}.tile.cloudmade.com/c3cc91391a2647e5a229c9ab6e4fe136/110137/256/{z}/{x}/{y}.png')
            .addTo(window.map);
            window.map.locate({
                setView: false,
                maxZoom: Config.defaultZoom,
                watch: true,
                enableHighAccuracy: true,
                maximumAge: 4000
            });
            // Ensimmäisellä lokaatiokerralla etsitään roskakorit ja keskitetään kartta käyttäjään
            window.map.once('locationfound', this.initCurrentLocation, this);
        }
    });

    return MapView;
});
