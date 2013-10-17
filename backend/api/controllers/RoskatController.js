/**
 * RoskatController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */


// URI - /roskat/get?x1=1&x2=2&y1=3&y2=4
module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  
  get: function(req, res) {
  	var request = require('request');
  	var x1,x2,y1,y2;
  	x1 = req.param('x1');
  	x2 = req.param('x2');
  	y1 = req.param('y1');
  	y2 = req.param('y2');
  	console.log(x1 + x2 + y1 + y2);
  	var r = {
  		uri: "http://tampere.navici.com/tampere_wfs_geoserver/tampere_iris/ows", 
	  	qs: {
	  		"service":"WFS", 
	  		"version":"2.0.0", 
	  		"request":"GetFeature", 
	  		"typeName":"tampere_iris:WFS_ROSKIS", 
	  		"outputFormat":"application/json",
	  		"srsName":"EPSG:4326", 
	  		"bbox":y1+","+x1+","+y2+","+x2+',EPSG:4326'
	  	}
  	};
  	console.log(r.uri);
  	console.log(r.qs);
  	request(r, function(error, response, body) {
  		if(!error && response.statusCode == 200) {
  			res.send(body);
  		}
  	});
  }


};
