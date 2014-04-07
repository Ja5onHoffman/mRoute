Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('homeTemplate', {path: '/'});
	this.route('aboutPage');
	this.route('flightPlanForm', {path: '/flightPlanForm'})
});