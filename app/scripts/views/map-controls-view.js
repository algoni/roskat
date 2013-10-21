/*global define*/
define(['backbone', 'hbs!tmpl/map-controls'], function(Backbone, Template) {

    'use strict';

    var MapControls = Backbone.View.extend({

        id: 'map-controls',
        className: 'map-controls',
        template: Template,

        render: function() {
            // TODO: kuuntele sijaintia ja näytä Valmis! -painike vasta roskakorin lähellä
            this.el.innerHTML = this.template();
            return this;
        }

    });

    return MapControls;

});
