/*global define*/
define([
    'backbone',
    'models/user',
    'hbs!tmpl/register'
], function(Backbone, User, Template) {

    'use strict';

    return Backbone.View.extend({

        template: Template,
        id: 'register-view',
        className: 'register-view',

        events: {
            'click #submit-user': 'submitUser'
        },

        submitUser: function() {
            this.username = $('#username').val();
            if( this.username.indexOf(':') === -1 ) {
                $.ajax({
                    method: 'post',
                    url: 'http://roskat-backend.herokuapp.com/user/register',
                    data: {
                        msg: btoa(this.username + ':' + window.App.user.id)
                    },
                    success: function() {
                        window.App.Vent.trigger('user:loggedIn', { name: this.username });
                        window.App.userModel.set({
                            name: this.username,
                            id: window.App.user.id,
                            loggedIn: true
                        });
                        window.App.Vent.trigger('userRegistered');
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
