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
    if(Session.get('tag')){
        return Articles.find({
            tags: Session.get('tag')
        });
    }else{
        //console.log("i was called");
        Meteor.call("findArticleWithAuthor", function(err, data){
            console.log("LETS DO IT");
            return data;
        });

        var articles = Articles.find({},{sort:{createdAt:-1}});
        var finalAricles = [];
        articles.forEach(
            function(myDoc) {
                var user =  Meteor.users.find({}, {"_id": myDoc.author}).fetch();
                console.log("TESTING USER: "+user);
                finalAricles.push({articleBody: myDoc, articleAuthor: {name: user[0].profile.full_name, slug: user[0].profile.slug}});
            }
        );
        console.log(finalAricles);
        return finalAricles;
    }
}