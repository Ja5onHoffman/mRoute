FiledRoutes = new Meteor.Collection('filedRoutes');


Meteor.startup(function() {
	if (FiledRoutes.find().count() === 0) {
		FiledRoutes.insert({route: "Jason"});
		FiledRoutes.insert({route: "Hoffman"});
	}
});

var url = "http://flightxml.flightaware.com/json/FlightXML2/";
var username = "jasonandrewhoffman";
var apiKey = "323da49e858c3d25fa589d1f6de62a96807f9dab";

Meteor.methods({
	callFltAware: function() {
		this.unblock();
		return Meteor.http.get(url + "RoutesBetweenAirports", {
		auth: "jasonandrewhoffman:323da49e858c3d25fa589d1f6de62a96807f9dab",
   	query: {origin: "KJFK", destination: "KATL"} 
		});
	}
});



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