/*global define*/
define(['backbone'], function(Backbone) {

    'use strict';

    var Trashcan = Backbone.Model.extend({
        initialize: function() {
            this.set('position', {
                lat: this.get('geometry').coordinates[1],
                lng: this.get('geometry').coordinates[0]
            });
        }
    });

    return Trashcan;

});
