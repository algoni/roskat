/*global define*/
define([
    'backbone',
    'models/user'
], function(Backbone, User) {

    'use strict';

    return Backbone.Collection.extend({
        model: User,
        url: 'http://roskat-backend.herokuapp.com/score/top'
    });

});
