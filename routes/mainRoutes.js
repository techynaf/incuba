Router.route('/', function () {
    this.render('home');
    SEO.set({ title: 'Home -' + Meteor.App.NAME });
});

Router.route('/register', function () {
    this.render('profile');
});

Router.map(function(){
    this.route('profile', {
        path: '/profile',
        layoutTemplate: 'profileLayout'
    });
});
