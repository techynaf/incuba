Template.write_article.helpers({
    'ArticleSubmitStatus': function(){

    },
    'getArticlePhoto': function () {
        return Session.get('getArticlePhoto');
    },

    ArticlePhotoUpload: function() {
        return {
            finished: function(index, fileInfo, context) {
                if(fileInfo){
                    Session.set('getArticlePhoto', fileInfo.name);
                }
            },

        }
    },
    tagSettings: function() {
        return {
            position: "top",
            limit: 5,
            rules: [
                {
                    token: '',
                    collection: Articles,
                    field: "tags",
                    filter: { type: "autocomplete" },
                    template: Template.userPill
                }
            ]
        };
    },
});

Template.write_article.events({
    'submit form': function(event) {
        event.preventDefault();
        var title = event.target.title.value;
        var body = event.target.body.value;
        var summary = event.target.summary.value;
        var tags = event.target.tag.value.split(',');
        var photo = event.target.articlePhoto.value;

        Articles.insert({
            title: title,
            summary: summary,
            tags:tags,
            body: body,
            createdAt: new Date(),
            slug: title.replace(/\s+/g, '-').toLowerCase() + '-' + UI._globalHelpers.randomString(10),
            author: Meteor.userId(),
            photo: photo,

        });
        $("#ArticleSubmitMsg").show();
        Session.set('getArticlePhoto', null);
        setTimeout(function(){
            Router.go('/');
        }, 1000);
    }
});

Template.write_article.onRendered(function(){
    $('[data-role="tagsinput"]').tagsinput({
        
    });
});

Session.set('ArticleSubmitMsg', null);
Session.set('getArticlePhoto', null);