Meteor.call("findArticleWithAuthor", function(err, data){
    Session.set('articleData', data);
});

Template['articles'].helpers({
    'article' : function () {
        return getArticles();
    },
});


Template['articles'].events({
    'click .tag_button': function(event) {
        event.preventDefault();
        Session.set('tag',event.currentTarget.innerText);
    },
});

function getArticles(){
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
            var user =  Meteor.users.findOne({"_id": myDoc.author});
            var d1 = Date.parse(myDoc.createdAt);
            var d2 = new Date(d1);
            var dateTime = d2.getDate()+"/"+d2.getMonth()+"/"+d2.getFullYear();
            if(user){
                finalAricles.push({
                    articleBody: myDoc,
                    articleAuthor: {
                        name: user.profile.full_name,
                        slug: user.profile.slug,
                        profilePicture: user.profile.profilePicture
                    },
                    articleDateTime: dateTime
                });
            }
        }
    );
    return finalAricles;
}


Session.set('tag', null);