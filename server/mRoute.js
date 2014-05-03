
Meteor.publish('filedRoutes', function(origin, destination) {
	return FiledRoutes.find({airports: {origin: origin, destination: destination}});
})

Meteor.startup(function() {
	// code to run on server at startup
});

var url = "http://flightxml.flightaware.com/json/FlightXML2/";
var username = "jasonandrewhoffman";
var apiKey = "0560af20db89ba4b2fba0dbae9d4543e36cfc69a";

Meteor.methods({
	callFltAware: function(origin, destination) {
		this.unblock()
      try {
        var result = HTTP.call("GET", url + 'RoutesBetweenAirportsEx', {
    		auth: "jasonandrewhoffman:0560af20db89ba4b2fba0dbae9d4543e36cfc69a",
            params: {
                origin: origin, 
                destination: destination,
                howMany: 15,
                offset: 0,
                maxDepartureAge: "10 days",
                maxFileAge: "30 days"
            }
    });
    
    var r = result.data.RoutesBetweenAirportsExResult.data; 
      for (var i = 0; i < r.length; i++) {
      var route = {
        airports: {
            origin: origin, 
            destination: destination
                },
        route: { 
              route: r[i].route, 
              filedAltitude_max: r[i].filedAltitude_max, 
              filedAltitude_min: r[i].filedAltitude_min
            }
          }

          FiledRoutes.upsert(route, route);
        }
        return result
      } catch (e) {
        console && console.log && console.log('Exception calling', url)
        throw e
      }
    }
  })