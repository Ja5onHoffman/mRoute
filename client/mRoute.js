FiledRoutes = new Meteor.Collection('filedRoutes');

Template.routesTemplate.filedRoutes = function() {
	return FiledRoutes.find();
};

Template.airportForm.events({
	"click input": function() {
	callFltAware();
	}
})

Meteor.call("callFltAware", function(e,r) {
	if (!e && r) {
		console.log(r.data);
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