/**
 * QuestController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */


//Tekee questin userille
//json-objekti requestiin mallia:
//{"msg":"base64(Username:deviceIDMD5Hash:distance(m):hardmode)}
//distance siis metreinä ja hardmode joko 0 tai 1 riippuen onko päällä vai ei
//oletuksena 1 on päällä.
module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  	complete: function(req, res) {
  		var temp = new Buffer(req.param("msg"), 'base64').toString('ascii');
  		console.log(temp);
  		temp = temp.split(":");

  		user.findOne().where({name:temp[0]}).where({devid: temp[1]}).exec(function(err, u) {
  			if(err) {
  				return res.send(500);
  			}
  			console.log(u);
  			if(u.length != 0) {
  				quest.create({userid: u.id, distance:temp[2], hardmode:temp[3]}).done(function(err, c) {
  					if(err) {
  						console.log(err);
  						return res.send(500);
  					} else {
  						console.log("Quest created: ", c);
  						return res.send(200);
  					}
  				})
  			} else {
  				return res.send(403);
  			}
  		});

  	}

};
