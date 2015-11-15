Meteor.publish("articles", function(){
    return Articles.find();
});

Meteor.publish("messages", function(){
    return Messages.find();
});