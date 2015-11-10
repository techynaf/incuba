Template['profileControl'].helpers({
    'full_name': function(){
        var full_name = "";
        if(Accounts.user()){
            full_name = Accounts.user().profile.full_name;
            return full_name;
        }else{
            return null;
        }
    }
});

Template['profileControl'].events({
    'hidden.bs.modal #popupregister': function (event) {
        event.preventDefault();
        Session.set('errorMSG', null);
        Session.set('successMSG', null);
    },
    'click #logoutButton': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});