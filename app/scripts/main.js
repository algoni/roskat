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

        /* Roskakorit-kanta */
        trash: 'http://tampere.navici.com/tampere_wfs_geoserver/tampere_iris/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tampere_iris:WFS_ROSKIS&outputFormat=application/json&srsName=EPSG:4326'

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
        }
    }
});

require(['backbone', 'views/app-view'], function (Backbone, AppView) {
    'use strict';

    var appView = new AppView();
    appView.render();
});
