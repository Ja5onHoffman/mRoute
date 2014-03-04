FiledRoutes = new Meteor.Collection('filedRoutes');

Template.routesTemplate.helpers({
	filedRoutes: function() {
		return FiledRoutes.find();
	}
});

Deps.autorun(function() {
	Meteor.subscribe('filedRoutes', Session.get("origin"), Session.get("destination"));
})

Template.airportForm.events({
	"submit form": function(event) {

		event.preventDefault()
		var origin = $('#origin').val();
		var destination = $('#destination').val();
  	Session.set('origin', $('#origin').val());
    Session.set('destination', $('#destination').val());
		Meteor.call("callFltAware", origin, destination, function (e, result) {
			if (!e && result) {
				console.log(result.data.RoutesBetweenAirportsExResult.data);
			}
		});
	}
})

Template.route.events({
	"click .route li": function(e) {
		$(e.target).select();
		alert("Press CTRL + S to copy the route: " + $(e.target).text() + " to the clipboard.");
	}
})

