Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('homeTemplate', {path: '/'});
	this.route('aboutPage');
	this.route('flightPlanForm', {path: '/flightPlanForm',
		onBeforeAction: function() {
			if (!Meteor.userId()) {
				this.render('homeTemplate');
				alert('You must login to view this page.');
				this.pause();
			}
		}
	});
})