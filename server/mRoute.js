FiledRoutes = new Meteor.Collection('filedRoutes');

Meteor.startup(function() {
	if (FiledRoutes.find().count() === 0) {
		FiledRoutes.insert({route: "Jason"});
		FiledRoutes.insert({route: "Hoffman"});
	}
});