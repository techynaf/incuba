Template.register.events({
    'submit form': function (event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var profileVar =  {"full_name" : event.target.registerFullName.value};
        console.log("Form submitted.");

        var trimInout = function(val){
            return val.replace(/^\s*|\s*$/g,"");
        }

        var emailVar = trimInout(emailVar);

        var isValidPassword = function(val){
            if(val.length > 6){
                return true;
            }
            return false;
        }

        if(isValidPassword(passwordVar)){
            Accounts.createUser({email: emailVar, password: passwordVar, profile: profileVar}, function(err){
                if(err){
                    Session.set('errorMSG', err.reason);
                    Session.set('successMSG', null);
                }else{
                    console.log(Meteor.userId());
                    Session.set('successMSG', 'Registration Successful!');
                    Session.set('errorMSG', null);
                }
            });

        }else{
            Session.set('errorMSG', 'Password too short.');
        }
    },
});



Template.register.helpers({
    errorMSG: function(){ return Session.get('errorMSG')},
    successMSG: function(){ return Session.get('successMSG')}
});

