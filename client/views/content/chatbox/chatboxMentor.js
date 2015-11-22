Template['chatboxMentor'].helpers({
    'messages' : function () {
        return getMessage(Session.get("user"));

    },
    'users' :function(){
        var uniqueUserArray = getUniqueUsers();
        var hello = [];
        for (key in uniqueUserArray ) {
            var userFullName = Meteor.users.find({_id: uniqueUserArray[key]}).fetch()[0];
            var totalMessage = Messages.find({$and: [{from: uniqueUserArray[key]},{seen: true}]}).count();
            hello.push({user: userFullName, count:totalMessage });
        }
        return hello;
    },

    'isCurrentWindow': function(userId){
        if (Session.get("user") === userId){
            Meteor.call('seenMessage', userId);
            return true;
        }else{
            return false;
        }

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
    getCurrentChattingUser: function(){
        if(Session.get("user")){
            return Meteor.users.find({_id: Session.get("user")}).fetch()[0];
        };
    },
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
        Meteor.call('seenMessage', userId);
        Session.set("user",userId);
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
    var message = Messages.find({  $or: [ { to: userId }, { from: userId}]}).fetch();
    return message;
}
