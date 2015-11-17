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
    console.log('from getArticles '+Session.get('searchArticle'));

    if(Session.get('searchArticle')){
        var articles=Articles.find({title: { $regex: Session.get('searchArticle'), $options: 'i' }});
        return addAuthorToArticle(articles);
    }else if(Session.get('tag')){
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
            var user =  Meteor.users.find({}, {"_id": myDoc.author}).fetch();
            finalAricles.push({articleBody: myDoc, articleAuthor: {name: user[0].profile.full_name, slug: user[0].profile.slug}});
        }
    );
    console.log(finalAricles);
    return finalAricles;
}