/*global define*/
define([
    'backbone',
    'hbs!tmpl/register'
], function(Backbone, Template) {

    'use strict';

    return Backbone.View.extend({

        template: Template,
        id: 'register-view',
        className: 'register-view',

        events: {
            'click #submit-user': 'submitUser'
        },

        submitUser: function() {
            var username = $('#username').val();
            if( username.indexOf(':') === -1 ) {
                $.ajax({
                    method: 'post',
                    url: 'http://roskat-backend.herokuapp.com/user/register',
                    data: {
                        msg: btoa(username + ':' + window.App.user.id)
                    },
                    success: function() {
                        window.App.Vent.trigger('user:loggedIn', { name: username });
                    }.bind(this)
                });
            }
        },

        render: function() {
            this.el.innerHTML = this.template();
            return this;
        }
    });

});
