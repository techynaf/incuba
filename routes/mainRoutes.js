Router.route('/', function () {
    this.render('content');
    SEO.set({ title: 'Home -' + Meteor.App.NAME });
});

Router.route('/write', function () {
    this.render('write_article');
    SEO.set({ title: 'WriteArticle -' + Meteor.App.NAME });
});

//Router.route('/profile', function () {
//    this.render('profile');
//    SEO.set({ title: 'Profile -' + Meteor.App.NAME });
//});

Router.route('singleArticle', {
    // get parameter via this.params
    path: '/article/:_slug',
    data: function (){
        slug  = this.params._slug;
        templateData = { slug: slug };
        return templateData;
    }
});

Router.route('profile', {
    // get parameter via this.params
    path: '/profile/:_slug',
    data: function (){
        slug  = this.params._slug;
        templateData = { slug: slug };
        return templateData;
    }
});