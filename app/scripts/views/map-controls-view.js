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
            'click #trashcan-found': 'completeQuest'
        },

        initialize: function() {
            window.App.Vent.on('user:targetTooFar', this.render, this);
            window.App.Vent.on('user:targetFound', this.render, this);
        },

        completeQuest: function() {
            console.log('Tavaraa lähtee ny');
        },

        render: function(context) {
            context = context || {};
            // TODO: kuuntele sijaintia ja näytä Valmis! -painike vasta roskakorin lähellä
            this.el.innerHTML = this.template(context);
            return this;
        }

    });

    return MapControls;

});
