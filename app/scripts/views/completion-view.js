/*global define*/
define([
    'backbone',
    'hbs!tmpl/completion'
], function(Backbone, Template) {

    'use strict';

    var CompletionView = Backbone.View.extend({

        template: Template,

        initialize: function() {
            console.log(this);
        },

        render: function() {
            this.el.innerHTML = this.template({points: this.options.quest.distance});
            return this;
        }

    });

    return CompletionView;

});
