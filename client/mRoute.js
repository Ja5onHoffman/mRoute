FiledRoutes = new Meteor.Collection('filedRoutes');

Template.routesTemplate.filedRoutes = function() {
	return FiledRoutes.find();
};