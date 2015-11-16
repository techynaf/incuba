Meteor.methods({
    'insertMessage': function(message, receiver){
        var loggedInUser = this.userId;

        if (!loggedInUser) {

            throw new Meteor.Error(403, "Access denied");

        }else if (Roles.userIsInRole(loggedInUser, ['mentor'], 'default-group')){
            //mentor
            Messages.insert({
                body: message,
                from: loggedInUser,
                to: receiver,
                type: 'mentor'
            });
            console.log("Posted as mentor");

        }else{
            //user
            Messages.insert({
                body: message,
                from: loggedInUser,
                to: receiver,
                type: 'user'
            });
            console.log("Posted as user");
        }

    }
    //findArticleWithAuthor: function(){
    //    var articles = Articles.find({},{sort:{createdAt:-1}});
    //    var finalAricles = [];
    //    articles.forEach(
    //        function(myDoc) {
    //            var user =  Meteor.users.find({}, {"_id": myDoc.author}).fetch();
    //            console.log("TESTING USER: "+user);
    //            finalAricles.push({articleBody: myDoc, articleAuthor: {name: user[0].profile.full_name, slug: user[0].profile.slug}});
    //        }
    //    );
    //    console.log(finalAricles);
    //    return finalAricles;
    //}
});