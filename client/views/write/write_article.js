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
});

Template.write_article.events({
    'submit form': function(event) {
        event.preventDefault();
        var title = event.target.title.value;
        var body = event.target.body.value;
        var summary = event.target.summary.value;
        //var tags = event.target.tag.value.split(',');
        var tags = $("#tagSuggestion").tagsinput('items');
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

Template.write_article.rendered = function(){
    var data = Articles.find({},{fields:{tags:1}}).fetch();
    var mainArray = [];
    for(key in data){
        var array = data[key].tags;
        for(key3 in array){
            mainArray.push(array[key3]);
        }
    }
    mainArray = _.uniq(mainArray);
    $('#tagSuggestion').tagsinput({
        typeahead: {
            source: mainArray
        },
        freeInput: true
    });
}


Session.set('ArticleSubmitMsg', null);
Session.set('getArticlePhoto', null);