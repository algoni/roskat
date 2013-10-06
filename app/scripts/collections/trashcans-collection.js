/*global define */
define(['backbone', 'models/trashcan'], function(Backbone, Trashcan) {

    'use strict';

    var Trashcans = Backbone.Collection.extend({
        model: Trashcan,

        getClosest: function(position) {
            var closest = {
                model: null,
                distance: Infinity
            };

            for (var i = this.models.length - 1; i >= 0; i--) {
                var a = Math.abs(this.models[i].get('lat') - position.lat());
                var b = Math.abs(this.models[i].get('lng') - position.lng());
                var distance = (a * a) + (b * b);

                if (distance <= closest.distance) {
                    closest = {
                        model: this.models[i],
                        distance: distance
                    };
                }
            }
            console.log(closest);
            return closest.model;
        }
    });

    return Trashcans;
});
