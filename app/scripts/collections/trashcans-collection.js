/*global define */
define(['backbone', 'models/trashcan'], function(Backbone, Trashcan) {

    'use strict';

    var Trashcans = Backbone.Collection.extend({
        model: Trashcan
    });

    return Trashcans;
});
