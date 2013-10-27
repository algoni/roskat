/*global define*/
define(['backbone'], function(Backbone) {

    'use strict';

    return Backbone.Model.extend({
        defaults: {
            name: '',
            id: '',
            points: 0,
            loggedIn: false
        }
    });

});
