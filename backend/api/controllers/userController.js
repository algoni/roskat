/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */


//Tää sitten muuten rekisteröi nimimerkin ja devid:n
//sekä nimimerkki että devid on yksilöllisiä
//Requestiin on laitettava bodyyn json objekti mallia:
// {"msg":"base64(Username:deviceIDMD5Hash)"}
//ts "salataan" viesti base64 encodella
module.exports = {

  	register: function(req, res) {
  		var temp = new Buffer(req.param("msg"), 'base64').toString('ascii');
  		console.log("Registering " + temp);
  		temp = temp.split(":");
  		user.find().where({name: temp[0]}).where({devid: temp[1]}).exec(function(err, u) {
  			if(err) {
  				return res.send(500);
  			}
  			console.log(u);
  			if(u.length == 0) {
  				user.create({name: temp[0], devid: temp[1]}).done(function(err, c) {
  					if(err) {
  						console.log(err);
  						return res.send(403);
  					} else {
  						console.log("User created: ", c);
		  				return res.send(200);				
  					}

  				});
  			} else {
  				return res.send(403);
  			}
  		});
  	}

};