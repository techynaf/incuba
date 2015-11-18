Meteor.call("findArticleWithAuthor", function(err, data){
    Session.set('articleData', data);
});

Template['articles'].helpers({
    'article' : function () {
        return getArticles();
    },
});


Template['articles'].events({
});

function getArticles(){
    console.log('from getArticles '+Session.get('tag'));

    if(Session.get('searchArticle')){
        var articles=Articles.find({title: { $regex: Session.get('searchArticle'), $options: 'i' }});
        return addAuthorToArticle(articles);
    }else if(Session.get('tag')){
        console.log("here");
        var articles= Articles.find({
            tags: Session.get('tag')
        });
        return addAuthorToArticle(articles);
    }else{
        Meteor.call("findArticleWithAuthor", function(err, data){
            return data;
        });

        var articles = Articles.find({},{sort:{createdAt:-1}});
        return addAuthorToArticle(articles);
    }
}

function addAuthorToArticle(articles){
    var finalAricles = [];
    articles.forEach(
        function(myDoc) {
            var user =  Meteor.users.findOne({"_id": myDoc.author});
            if(user){
                finalAricles.push({articleBody: myDoc, articleAuthor: {name: user.profile.full_name, slug: user.profile.slug}});
            }
        }
    );
    console.log(finalAricles);
    return finalAricles;
}


Session.set('tag', null);