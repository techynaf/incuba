Meteor.publish("articles", function(){
    return Articles.find();
});

Meteor.publish("messages", function() {
    var loggedInUser = this.userId;
    return Messages.find({  $or: [ { to: loggedInUser }, { from: loggedInUser },
        { to: "mentor" }, { from: "mentor" }
    ] });
    //return Messages.find();
});

Meteor.publish('authors', function() {
    return Meteor.users.find({}, {fields: {profile: 1}});
});