/*global define*/
define([
    'backbone',
    'config',
    'views/map-view',
    'views/menu-view',
    'views/search-view'
], function(Backbone, Config, MapView, MenuView, SearchView) {

    'use strict';

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            window.App.Vent.on('showMap', this.showMapView, this);

            $.get('http://roskat-backend.herokuapp.com/user/check?id=' + window.App.user.id, function(res) {
                if( res.length === 0 ) {
                    $.ajax({
                        method: 'post',
                        url: 'http://roskat-backend.herokuapp.com/user/register',
                        data: {
                            msg: btoa('Selain:' + window.App.user.id)
                        }
                    });
                }
                else {
                    window.App.Vent.trigger('user:loggedIn', res[0]);
                }
            });
        },

        render: function() {
            this.searchView = new SearchView();
            this.$el.append(new MenuView().render().el);
            this.el.appendChild(this.searchView.render().el);
            return this;
        },

        showMapView: function() {
            this.searchView.remove();
            this.mapView = new MapView();
            this.$el.append(this.mapView.render().el);
            this.mapView.drawMapCanvas();
        }

    });
});
