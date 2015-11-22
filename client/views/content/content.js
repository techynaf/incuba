Template['content'].helpers({

});

Template['content'].events({
    "click #forward": function(){
        Session.set("forwardClicked", 1);
        Session.set("backbackwardPressed", null);
    },
});