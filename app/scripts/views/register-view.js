/*global define*/
define(['backbone'], function(Backbone) {

    'use strict';

    return Backbone.View.extend({

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
                        console.log(this);
                        window.App.Vent.trigger('user:loggedIn', { name: username });
                        this.remove();
                    }.bind(this)
                });
            }
        },

        render: function() {
            this.el.innerHTML = '<input type="text" id="username" placeholder="Käyttäjänimesi"><button id="submit-user">OK</button>';
            return this;
        }
    });

});
