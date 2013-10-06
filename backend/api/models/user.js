/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  	attributes: {
	  	name: {
	  		type: 'string',
	  		required: true,
	  		maxLength: 20
  		},
	  	devid: {
	  		type: 'string',
	  		required: true,
	  		minLength: 32,
	  		maxLength: 32
	  	},
	  	toJSON: function() {
	  		var obj = this.toObject();
	  		delete obj.devid;
	  		return obj;
	  	}
 	}

};
