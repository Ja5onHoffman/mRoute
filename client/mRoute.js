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
		var origin = $('#origin').val().toUpperCase();
		var destination = $('#destination').val().toUpperCase();;
  	Session.set('origin', $('#origin').val().toUpperCase());
    Session.set('destination', $('#destination').val().toUpperCase());
    $(".table").show();
    $( "tr:odd" ).css( "background-color", "#bbbbff" );
		Meteor.call("callFltAware", origin, destination, function (e, result) {
			if (!e && result) {
				console.log(result.data.RoutesBetweenAirportsExResult.data);
			}
		});
	}
})

Template.route.events({
	"click #main > div > table > tbody > tr:nth-child(11) > td": function(e) {
		$(e.target).select();
		alert("Press CTRL + S to copy the route: " + $(e.target).text() + " to the clipboard.");
	}
})
