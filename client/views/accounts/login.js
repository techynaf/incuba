Template.login.events({
    'submit #login': function (event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;

        Meteor.loginWithPassword(emailVar,passwordVar,function(err){
            if(Meteor.user()){
                //TODO: close the modal
                Session.set('errorMSG', '');
                $('#loginModal').modal('hide');
            }else{
                Session.set('errorMSG',err.reason);
            }
        });
    }
});

Template.login.helpers({
    errorMSG: function(){ return Session.get('errorMSG')},
});