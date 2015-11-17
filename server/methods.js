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
    },
    updateUserInfo: function(fieldname, value){
        var $set = {};
        $set['profile.' + fieldname] = value;
        //if(Session.get('full_name')){
        //    Session.set('full_name', value);
        //}else{
        //    Session.set('full_name', value);
        //}
        Meteor.users.update(
            {_id:Meteor.user()._id},
            {$set: $set}
        );
    }
});


