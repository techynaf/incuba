Meteor.publish("articles", function(){
    return Articles.find();
});

Meteor.publish("messages", function() {
    return Messages.find();
});

Meteor.publish('authors', function() {
    return Meteor.users.find({}, {fields: {profile: 1}});
});