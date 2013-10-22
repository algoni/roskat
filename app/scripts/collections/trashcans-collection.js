/*global define */
define(['backbone', 'models/trashcan'], function(Backbone, Trashcan) {

    'use strict';

    var Trashcans = Backbone.Collection.extend({

        model: Trashcan,
        url: 'http://roskat-backend.herokuapp.com/roskat/get',

        parse: function(response) {
            return JSON.parse(response).features;
        },

        getClosest: function(position) {
            var closest = {
                model: null,
                distance: Infinity
            };

            for (var i = this.models.length - 1; i >= 0; i--) {
                var a = Math.abs(this.models[i].get('geometry').coordinates[1] - position.lat);
                var b = Math.abs(this.models[i].get('geometry').coordinates[0] - position.lng);
                var distance = Math.sqrt((a * a) + (b * b));

                if (distance <= closest.distance) {
                    closest = {
                        model: this.models[i],
                        distance: distance
                    };
                }
            }

            this.closest = closest;
            return closest.model;
        }
    });

    return Trashcans;
});
