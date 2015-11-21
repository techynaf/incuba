Template.register.events({
    'submit #registration': function (event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var profileVar =  {
            "full_name" : event.target.registerFullName.value,
            "slug"      : event.target.registerFullName.value.replace(/\s+/g, '-').toLowerCase()+ '-' + UI._globalHelpers.randomString(10),
            "location"  : '',
            "sex"       : '',
            "profilePicture": 'avatar.gif',
            "courseTaken": [],
            "areaOfInterest": [],
            "areaOfWorks" : [],
            "internships": [],
            "worksAt":[],
            "workedAt":[],
            "projectsCompleted":[],
            "workInternships":[],
            "eventsAttended":[],
            "trainingAttended":[],
            "certificationAchieved":[],
        };
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
            id = Accounts.createUser({email: emailVar, password: passwordVar, profile: profileVar}, function(err){
                if(err){
                    Session.set('errorMSG', err.reason);
                    Session.set('successMSG', null);
                }else{
                    console.log(Meteor.userId());
                    Session.set('successMSG', 'Registration Successful!');
                    Session.set('errorMSG', null);

                    setTimeout(function() {
                        $("#registerModal").modal('hide');
                        Session.set('successMSG', '');
                    }, 2000);
                }
            });


        }else{
            Session.set('errorMSG', 'Password too short.');
        }
    }

});



Template.register.helpers({
    errorMSG: function(){ return Session.get('errorMSG')},
    successMSG: function(){ return Session.get('successMSG')}
});

//
//function randomString(len, charSet) {
//    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//    var randomString = '';
//    for (var i = 0; i < len; i++) {
//        var randomPoz = Math.floor(Math.random() * charSet.length);
//        randomString += charSet.substring(randomPoz,randomPoz+1);
//    }
//    return randomString;
//}
