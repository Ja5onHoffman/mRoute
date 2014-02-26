FiledRoutes = new Meteor.Collection('filedRoutes');

Template.routesTemplate.helpers({
	filedRoutes: function() {
		return FiledRoutes.find();
	}
});

Deps.autorun(function() {
	Meteor.subscribe('filedRoutes', Session.get('origin'), Session.get('destination'));
})

Template.airportForm.events({
	"submit form": function(event) {
		event.preventDefault()
		var origin = $('#origin').val();
		var destination = $('#destination').val()
		Session.set('origin', $('#origin').val());
		Session.set('destination', $('#destination').val());
		Meteor.call("callFltAware", origin, destination, function (e, result) {
			if (!e && result) {
				console.log(result.data.RoutesBetweenAirportsExResult.data);
			}
		});
	}
})



// Push routes to database and show long list of previously filed routes. 


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