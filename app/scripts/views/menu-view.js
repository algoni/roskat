/*global define*/
define([
    'backbone',
    'hbs!tmpl/main-menu'
], function(Backbone, Template) {

    'use strict';

    return Backbone.View.extend({

        className: 'main-menu',
        template: Template,

        render: function() {
            this.el.innerHTML = this.template();
            return this;
        }

    });
});
