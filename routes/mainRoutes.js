Router.route('/', function () {
    this.render('content');
    SEO.set({ title: 'Home -' + Meteor.App.NAME });
});

Router.route('/write', function () {
    this.render('write_article');
    SEO.set({ title: 'WriteArticle -' + Meteor.App.NAME });
});

Router.route('/profile', function () {
    this.render('profile');
    SEO.set({ title: 'Profile -' + Meteor.App.NAME });
});