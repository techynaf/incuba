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
    },

    getCurrentUserName: function(){
        var userFullName = Meteor.users.findOne({_id: Meteor.user()._id}).profile.full_name;
        return userFullName;
    },

    getCurrentUserProfilePicture: function(){
        var photo = Meteor.users.findOne({_id: Meteor.user()._id}).profile.profilePicture;
        return photo;
    },

    checkMeteorUser: function () {
        return Meteor.user();
    }
});


Template['chatbox'].events({

    "submit form": function(event) {
        event.preventDefault();
        var body = event.target.message.value;
        var to = 'TKSRGPzCoF7Tbq3hW';
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
    },

    "click #backward": function(){
        Session.set('backwardPressed', 1);
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
    setTimeout(function() {
        $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
    }, 50);
    if(Meteor.user()) {
        var message = Messages.find({$or: [{to: userId}, {from: userId}]}).fetch();
        return message;
    }else{
        return null;
    }
}

Session.set('backwardPressed', null);
