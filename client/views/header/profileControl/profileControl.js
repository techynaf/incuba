Template['profileControl'].helpers({
    'full_name': function(){
        var full_name = "";
        if(Accounts.user()){
            full_name = Accounts.user().profile.full_name;
            return full_name;
        }else{
            return null;
        }
    },
    'slug': function(){
        var slug = "";
        if(Accounts.user()){
            slug = Accounts.user().profile.slug;
            return slug;
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
    },

    'click #postArticle': function(event){
        //event.preventDefault();
        console.log("posting article");
    },
    'click #logoClicked': function(event){
        event.preventDefault();
        Router.go('/');
        //Meteor._reload.reload();
    }
});