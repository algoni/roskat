/*global define*/
define([
    'backbone',
    'hbs!tmpl/search-view'
], function(Backbone, Template) {

    'use strict';

    var SearchView = Backbone.View.extend({

        id: 'search-view',
        className: 'search-view',
        template: Template,

        events: {
            'click #search-button': 'beginSearch'
        },

        beginSearch: function() {
            this.$('#search-button').html('Etsitään...');
            window.App.Vent.trigger('showMap');
        },

        render: function() {
            this.el.innerHTML = this.template();
            return this;
        }

    });

    return SearchView;

});
