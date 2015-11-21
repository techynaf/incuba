Meteor.startup(function(){

    if ( Meteor.users.find().count() === 0 ) {
        var users = [
            {full_name: 'Admin', email: 'admin@incuba.com', password: 'password', profilePicture: "writer.png", slug: 'admin-las9gssjkgdn',roles: ['admin'] },
            {full_name: 'Mentor', email: 'mentor@incuba.com', password: 'password',profilePicture: "mentor.png", slug: 'mentor-ndsgjk3920g', roles: ['mentor'] },
            {full_name: 'Writer',email: 'writer@incuba.com', password: 'password', profilePicture: "writer.png", slug: 'writer-lsfb1398r', roles: ['writer'] },
            {full_name: 'Sakib Hasan',email: 'ajobbalok22@gmail.com', password: '9134967', profilePicture: "avatar.gif", slug: 'sakib-hasan-lsfb1398r', roles: ['writer'] },
            {full_name: 'Sunny',email: 'sunny@incuba.com', password: 'password', profilePicture: "avatar.gif", slug: 'sunny-aosfn87g3ngs', roles: ['writer'] },
            {full_name: 'Prince',email: 'prince@incuba.com', password: 'password', profilePicture: "avatar.gif", slug: 'prince-alsjnf298ht', roles: ['writer'] },
            {full_name: 'User',email: 'user@incuba.com', password: 'password', profilePicture: "avatar.gif", slug: 'user-alksnf2ghe'}
        ];

        _.each(users, function(userData){
            var userId = Accounts.createUser({
                email: userData.email,
                password: userData.password,
                profile : {full_name: userData.full_name, slug: userData.slug, profilePicture: userData.profilePicture}
            });
            Meteor.users.update({_id:userId}, {$set: {'emails.0.verified':true}});
            if(userData.roles){
                Roles.addUsersToRoles(userId,userData.roles, 'default-group');
            }
        })
        //create mentor.
        var profile = {full_name: 'Mentor', email: 'mentor@incuba.com', password: 'password',profilePicture: "mentor.png", slug: 'mentor', roles: ['mentor'] };
        var userId = Accounts.createUser({
            _id: 'demoMentor',
            email: profile.email,
            password: profile.password,
            profile : {full_name: profile.full_name, slug: profile.slug}
        });

        Meteor.users.update({_id:userId}, {$set: {'emails.0.verified':true}});
        if(userData.roles){
            Roles.addUsersToRoles(userId,profile.roles, 'default-group');
        }
    }

    UploadServer.init({
        tmpDir: process.env.PWD + '/.uploads/tmp',
        uploadDir: process.env.PWD + '/.uploads/',
        checkCreateDirectories: true //create the directories for you
    });

});