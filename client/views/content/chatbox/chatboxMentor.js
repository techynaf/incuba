Template['chatboxMentor'].helpers({
    'messages' : function () {
        console.log(Meteor.userId());
        return getMessage(Session.get("user"));

    },
    'users' :function(){
        var uniqueUserArray = getUniqueUsers();
        var hello = [];
        for (key in uniqueUserArray ) {
            var userFullName = Meteor.users.find({_id: uniqueUserArray[key]}).fetch()[0];
            hello.push(userFullName);
        }
        return hello;
    },

    'isUserMessage': function (type) {
        return type === "user"
    },

    'isMentorMessage': function (type) {
        return type === "mentor"
    },

    'isSiteMessage': function (type) {
        return type === "site"
    }
});

Template['chatboxMentor'].events({

    "submit form": function(event) {
        event.preventDefault();
        var body = event.target.message.value;
        var to = Session.get("user") ;
        event.target.message.value = "";
        Meteor.call('insertMessage', body, to);
        console.log("Message sent");
    },
    "click .user" : function(event){
        event.preventDefault();
        var userId= event.currentTarget.id;
        Session.set("user",userId);
        console.log(event.currentTarget.id);
    }


});

function getUniqueUsers(){
    var data = Messages.find({},{fields:{from:1}}).fetch();
    //TODO::optimize it later, group by should be changed to uniq.
    var groupedDates = _.groupBy(_.pluck(data, 'from'));
    var array = [];
    _.each(_.values(groupedDates), function(dates) {
       array.push (dates[0]);
    });
    return array;
}

function getMessage(userId){
    //var userFullName = Meteor.users.find({_id:userId}).fetch()[0].profile.full_name;
    var message = Messages.find({  $or: [ { to: userId }, { from: userId}]}).fetch();
    //console.log(userFullName);
    console.log(message);
    return message;
}
