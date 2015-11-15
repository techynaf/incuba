Meteor.methods({
    findArticleWithAuthor: function(){
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
});