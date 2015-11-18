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
    },

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
                type: 'mentor',
                sentAt: new Date()
            });
            console.log("Posted as mentor");

        }else{
            //user
            Messages.insert({
                body: message,
                from: loggedInUser,
                to: receiver,
                type: 'user',
                seen: true,
                sentAt: new Date()
            });
            console.log("Posted as user");
        }

    },

    'seenMessage': function(userId){
        Messages.update({from:userId }, {$set: {seen: false} },  {multi: true});
    }
});
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
