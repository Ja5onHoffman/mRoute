
Template.routesTemplate.helpers({
	filedRoutes: function() {
		return FiledRoutes.find();
	}
});

Template.flightPlanForm.routeFill = function() {
	return Session.get('content');
}

Template.flightPlanForm.events({
	"click #save": function(e, t) {
		e.preventDefault;
		var type = t.find('#type').value,
		acID = t.find('#acID').value,
		acType = t.find('#acType').value,
		specialEquip = t.find('#specialEquip').value,
		TAS = t.find('#TAS').value,
		remarks = t.find('#remarks').value,
		pilotName = t.find('#pilotName').value,
		pilotAddress = t.find('#pilotAddress').value,
		pilotPhone = t.find('#pilotPhone').value;

		Meteor.users.update(Meteor.userId(), {$set: 
			{ profile: {
				      type: type,
				      acType: acType,
				      acID: acID,
				      specialEquip: specialEquip,
				      tas: TAS,
				      remarks: remarks,
				      pilotNAP: {
				        name: pilotName,
				        address: pilotAddress,
				        phone: pilotPhone
				      }}}})
	},

	"click #file": function(e) {
		e.preventDefault;

	}
})


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
		e.preventDefault;
		if (Meteor.user() === null) {
			alert("Log in to file this route");
		} else {
			var content = $('#routing').text();
			Session.set('content', $('#routing').text());
			Router.go('/flightPlanForm');
		}
	}
})


Template.navBar.events({
	"click .login": function(e) {
		e.preventDefault;
		Session.set('overlay', true);
	}
})

Template.registerForm.events({
	'submit #registerForm' : function(e, t) {
      e.preventDefault();
      var email = t.find('#email').value, 
      password = t.find('#password').value;

      console.log(email);
      console.log(password);

        // Trim and validate the input
   //  if (options.password.length > 6 && options.password.length != 0)
     	Accounts.createUser({
				    email: email,
				    password: password,
				    profile: {
				      type: "",
				      aircraftType: "",
				      aircraftID: "",
				      specialEquip: "",
				      tas: "",
				      remarks: "",
				      pilotNAP: {
				        name: "",
				        address: "",
				        phone: ""
				      },
				      homeBase: ""
				    }
				}, function(err) {
      	if (err) {
            // Inform the user that account creation failed
            alert("There was an error.");
          } else {
            // Success. Account has been created and the user
            // has logged in successfully.
            alert("Success!");
            Session.set('overlay', false);
          }
        });
      return false;
    },

    'click .close': function(e) {
    	e.preventDefault();
    	Session.set('overlay', false);
    },

    'click #loginLink': function(e) {
    	e.preventDefault();
    	Session.set('userLogin', true);
    }
  })

Template.loginForm.events({
	'submit #loginForm' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#email').value;
      var password = t.find('#password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err) {
        	 // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
        	alert('There was an error.');
	       } else {
          // The user has been logged in.
          alert('Success!');
          Session.set('overlay', false);
        }
      });
         return false; 
      },

	'click #registerLink': function(e) {
		e.preventDefault();
		Session.set('userLogin', false);
	},

	'click .close': function(e) {
    	e.preventDefault();
    	Session.set('overlay', false);
    },
})

Template.overlay.helpers({
	overlay: function() {
		return Session.get('overlay');
	},

	userLogin: function() {
		return Session.get('userLogin');
	}
})
