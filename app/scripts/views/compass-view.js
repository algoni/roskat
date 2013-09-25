/*global define*/
define(['backbone', 'hbs!tmpl/compass-view'], function(Backbone, Template) {

    'use strict';

    var CompassView = Backbone.View.extend({

        tagName: 'div',
        id: 'compass-view',
        currentDirection: 0,
        template: Template,

        initialize: function() {
            window.addEventListener('deviceorientation', this.orientationChanged.bind(this), false);
        },

        render: function(orientation) {
            this.el.innerHTML = this.template({ angle: this.getRotationAngle(orientation) });
            return this;
        },

        getRotationAngle: function(compassHeading) {
            return Math.floor(compassHeading) * -1;
        },

        orientationChanged: function(event) {
            this.render(event.webkitCompassHeading);
        }

    });

    return CompassView;
});
