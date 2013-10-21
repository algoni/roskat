/*global define*/
define([
    'backbone',
    'collections/trashcans-collection',
    'hbs!tmpl/map-controls'
], function(Backbone, TrashcansCollection, Template) {

    'use strict';

    var MapControls = Backbone.View.extend({

        id: 'map-controls',
        className: 'map-controls',
        template: Template,

        events: {
            'click #trashcan-found': 'checkIfFound'
        },

        checkIfFound: function() {
            window.App.Vent.trigger('locationCheckRequested');
        },

        render: function() {
            // TODO: kuuntele sijaintia ja näytä Valmis! -painike vasta roskakorin lähellä
            this.el.innerHTML = this.template();
            return this;
        }

    });

    return MapControls;

});
