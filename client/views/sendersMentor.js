Template['sendersMentor'].helpers({

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

    }
});

Template['sendersMentor'].events({

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
