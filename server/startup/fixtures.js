Meteor.startup(function(){

    if ( Meteor.users.find().count() === 0 ) {
        var users = [
            {full_name: 'Admin', email: 'admin@incuba.com', password: 'password', roles: ['admin'] },
            {full_name: 'Mentor', email: 'mentor@incuba.com', password: 'password', roles: ['mentor'] },
            {full_name: 'Writer',email: 'writer@incuba.com', password: 'password', roles: ['writer'] },
            {full_name: 'Sakib Hasan',email: 'ajobbalok22@gmail.com', password: '9134967', slug: 'sakib-hasan-lsfb1398r', roles: ['writer'] },
            {full_name: 'Sunny',email: 'sunny@incuba.com', password: 'password', roles: ['writer'] },
            {full_name: 'Prince',email: 'prince@incuba.com', password: 'password', roles: ['writer'] },
            {full_name: 'User',email: 'user@incuba.com', password: 'password'}
        ];

        _.each(users, function(userData){
            var userId = Accounts.createUser({
                email: userData.email,
                password: userData.password,
                profile : {full_name: userData.full_name, slug: userData.slug}
            })
            Meteor.users.update({_id:userId}, {$set: {'emails.0.verified':true}});
            if(userData.roles){
                Roles.addUsersToRoles(userId,userData.roles);
            }
        })
    }
});