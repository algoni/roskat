/*global define*/
define([
    'backbone',
    'hbs!tmpl/search-view'
], function(Backbone, Template) {

    'use strict';

    var SearchView = Backbone.View.extend({

        id: 'search-view',
        template: Template,

        render: function() {
            this.el.innerHTML = this.template();
            return this;
        }

    });

    return SearchView;

});
