Session.setDefault('showLogin', false)

Template['basicLayout'].helpers({
    currentUser: function() {
        return Meteor.user().emails[0].address;
    },

    isTrue: function() {
        return Session.get('showLogin');
    }

});

Template['basicLayout'].events({
    'click .button': function (e) {
        Session.set('showLogin', true);
        console.log(Session.keys.showLogin);
    },

    'click .button2': function (e) {
        Session.set('showLogin', false);
        console.log(Session.keys.showLogin);
    },

    'click .button3': function (e) {
        AccountsTemplates.logout();
        console.log("Logout");
    }
});
