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
            App.Vent.on('user:targetTooFar', this.render, this);
            App.Vent.on('user:targetFound', this.render, this);
        },

        completeQuest: function() {
            var distance = Math.floor(this.distance);
            var isHardmode = 0; // TODO
            $.ajax({
                method: 'post',
                url: 'http://roskat-backend.herokuapp.com/quest/complete',
                data: {
                    msg: btoa(App.user.id + ':' + distance + ':' + isHardmode)
                },
                success: function(res) {
                    App.Vent.trigger('quest:completionRegistered', res);
                }
            });
        },

        render: function(context) {
            context = context || {};
            if( context.found ) {
                this.distance = context.distance;
            }
            // TODO: kuuntele sijaintia ja näytä Valmis! -painike vasta roskakorin lähellä
            this.el.innerHTML = this.template(context);
            return this;
        }

    });

    return MapControls;

});
