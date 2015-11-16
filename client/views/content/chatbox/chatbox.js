Template['chatbox'].helpers({
    'messages' : function () {
        var userId = Meteor.userId();
        console.log(Meteor.userId());
        return getMessage(userId);

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


Template['chatbox'].events({

    "submit form": function(event) {
        event.preventDefault();
        var body = event.target.message.value;
        var to = 'gpngPePSEvFzPuBry';
        event.target.message.value = "";
        Meteor.call('insertMessage', body, to);
        console.log("Message sent");
    },
    "click #user" : function(event){
        event.preventDefault();
        var userId= event.currentTarget.innerText;
        Meteor.call('insertMessage', userId);
        Session.set("user",userId);
        console.log(userId);
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
