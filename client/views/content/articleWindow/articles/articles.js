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
        console.log('from if condition '+Session.get('searchArticle'));
        var query = Session.get('searchArticle');
        var articles = Articles.find({}); //write a query here
        console.log('search '+query);
        //Session.set('searchArticle',null);
        //return addAuthorToArticle(articles);

        if (Session.get("searchValue")) {
            return addAuthorToArticle(Articles.find({}, { sort: [["score", "desc"]] }));
        } else {
            return addAuthorToArticle(Articles.find({}));
        }
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
    return finalAricles;
}