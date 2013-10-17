/*global google*/
require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',

        /* Backbone */
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore/underscore',

        /* RequireJS plugins */
        googleMaps: '../bower_components/requirejs-plugins/src/goog',
        async: '../bower_components/requirejs-plugins/src/async',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        json: '../bower_components/requirejs-plugins/src/json',
        text: '../bower_components/requirejs-text/text',
        tmpl: 'template',

        /* Handlebars */
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs',

        /* Roskakorit-kanta */
        trash: 'http://tampere.navici.com/tampere_wfs_geoserver/tampere_iris/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tampere_iris:WFS_ROSKIS&outputFormat=application/json&srsName=EPSG:4326',

        /* Leaflet */
        leaflet: '../bower_components/leaflet-dist/leaflet-src'

    },
    shim: {
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery']
        },
        bootstrapCollapse: {
            deps: ['jquery']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapPopover: {
            deps: ['jquery']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery']
        },
        bootstrapTooltip: {
            deps: ['jquery']
        },
        bootstrapTransition: {
            deps: ['jquery']
        },

        underscore: {
            exports: '_'
        },

        leaflet: {
            exports: 'L',
            deps: []
        },

        handlebars: {
            deps: [],
            exports: 'Handlebars'
        }
    },

    hbs: {
        disableI18n: true
    }
});

require(['backbone', 'views/app-view', 'config', 'leaflet'], function (Backbone, AppView, Config, L) {
    'use strict';

    if (typeof Number.prototype.toRad === 'undefined') {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        };
    }

    if (typeof Number.prototype.toDeg === 'undefined') {
        Number.prototype.toDeg = function() {
            return this * 180 / Math.PI;
        };
    }

    L.LatLng.prototype.getCoordWithDistanceAndAngle = function(distance, bearing) {
        // http://www.movable-type.co.uk/scripts/latlong.html

        var R = 6378100; // Maan säde metreinä

        distance = distance / R;  // Etäisyys radiaaneina
        bearing = bearing.toRad();
        var lat1 = this.lat.toRad(), lon1 = this.lng.toRad();

        var lat2 = Math.asin( Math.sin(lat1) * Math.cos(distance) +
                   Math.cos(lat1) * Math.sin(distance) * Math.cos(bearing) );
        var lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(lat1),
                   Math.cos(distance) - Math.sin(lat1) * Math.sin(lat2));

        lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;  // Normalisoidaan välille -180º..+180º
        return [lat2.toDeg(), lon2.toDeg()];
    };

    window.App = {
        config: Config,
        userPosition: null
    };

    new AppView().render();

});
