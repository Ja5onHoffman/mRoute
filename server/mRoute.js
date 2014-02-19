FiledRoutes = new Meteor.Collection('filedRoutes');


Meteor.startup(function() {
	// code to run on server at startup
});

var url = "http://flightxml.flightaware.com/json/FlightXML2/RoutesBetweenAirports";
var username = "jasonandrewhoffman";
var apiKey = "323da49e858c3d25fa589d1f6de62a96807f9dab";

Meteor.methods({
	callFltAware: function(origin, destination) {
		this.unblock()
      try {
        var result = HTTP.call("GET", url + "?origin=" + origin + "&destination=" + destination, {
    		auth: "jasonandrewhoffman:0560af20db89ba4b2fba0dbae9d4543e36cfc69a", 
    });
        return result
      } catch (e) {
        console && console.log && console.log('Exception calling', url)
        throw e
      }
    }
  })


/* 
var http = require('http');
var rest = require('restler');

var fxml_url = 'http://flightxml.flightaware.com/json/FlightXML2/';
var username = 'jasonandrewhoffman';
var apiKey = '323da49e858c3d25fa589d1f6de62a96807f9dab';

var origin = 'KIAD';
var destination = 'KORD';


rest.get(fxml_url + 'RoutesBetweenAirports', {
	username: username,
	password: apiKey,
	query: {origin: origin, destination: destination}
}).on('success', function(result, resp) {
	console.log('Filed routes between ' + origin + ' and ' + destination + ':');
	var r = result.RoutesBetweenAirportsResult.data;
	for (var i = 0; i < r.length; i++) {
		console.log('Route: ' + r[i].route + '\n' +
			'Altitude: ' + r[i].filedAltitude);
		};
	})

	*/