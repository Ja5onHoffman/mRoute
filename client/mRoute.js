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
	event.preventDefault();
	if ($("#origin").val() && $("#destination").val()) {
		var origin = $('#origin').val().toUpperCase();
		var destination = $('#destination').val().toUpperCase();;
  	Session.set('origin', $('#origin').val().toUpperCase());
    Session.set('destination', $('#destination').val().toUpperCase());
		Meteor.call("callFltAware", origin, destination, function (e, result) {
			if (!e && result) {
				console.log(result.data.RoutesBetweenAirportsExResult.data);
				$(".table").show();
				} else {
					alert("Sorry, no routes filed recently between those two airports");
				}
		});
			} else {
			alert("Please make sure you've entered an origin and destination");
		}
	}
})

Template.route.events({
	"click #routeRow": function(e) {
		alert("Hightlight the route: " + $("#routing").text() + ", then press Ctrl + C to copy to the clipboard.");
	}
})
