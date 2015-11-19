Template['profile'].helpers({
    profilePictureUpload: function() {
        return {
            finished: function(index, fileInfo, context) {
                if(fileInfo){

                    console.log(fileInfo);

                    Meteor.call("updateUserInfo", "profilePicture", fileInfo.name, function(err, data){
                        $("#photoUploadModal").modal('hide');
                    });
                }
            },

        }
    },


    'checkUser': function(){
        if(Meteor.user()){
            if(Meteor.user().profile.slug == slug){
                return true;
            }
        }
        return false;
    },


    'optionsFullName': function () {
        var user =  Meteor.users.findOne({'profile.slug' : slug });

        if(user){
            value = user.profile.full_name;
        }else{
            value = "Full Name";
        }

        return {
            type: 'text',
            async: true,
            placeholder: 'Full Name',
            position: 'right',
            value: value,
            onsubmit: function (val, cb) {
                setTimeout(function () {
                    Meteor.call("updateUserInfo", "full_name", val, function(err, data){
                        //
                    });
                    cb();
                }, 50);
            }
        };
    },

    'optionsAge': function () {
        var user =  Meteor.users.findOne({'profile.slug' : slug });
        if(user.profile.age){
            value = user.profile.age;
        }else{
            value = "Age";
        }
        return {
            type: 'text',
            async: true,
            placeholder: 'Age',
            position: 'right',
            value: value,
            onsubmit: function (val, cb) {
                setTimeout(function () {
                    Meteor.call("updateUserInfo", "age", val, function(err, data){
                        //
                    });
                    cb();
                }, 50);
            }
        };
    },

    'optionsSex': function () {
        var user =  Meteor.users.findOne({'profile.slug' : slug });
        if(user.profile.sex){
            value = user.profile.sex;
        }else{
            value = "Gender";
        }
        return {
            type: 'select',
            async: true,
            placeholder: 'Gender',
            position: 'right',
            value: value,
            source: [{value: "Male", text: "Male"}, {value: "Female", text: "Female"}, {value: "Others", text: "Others"}],
            onsubmit: function (val, cb) {
                setTimeout(function () {
                    Meteor.call("updateUserInfo", "sex", val, function(err, data){
                        //
                    });
                    cb();
                }, 50);
            }
        };
    },

    'optionsLocation': function () {
        var user =  Meteor.users.findOne({'profile.slug' : slug });
        var value;
        if(user.profile.location){
            value = user.profile.location;
        }else{
            value = "Your Location";
        }
        return {
            type: 'text',
            async: true,
            placeholder: 'Location',
            position: 'right',
            value: value,
            onsubmit: function (val, cb) {
                setTimeout(function () {
                    Meteor.call("updateUserInfo", "location", val, function(err, data){
                        //
                    });
                    cb();
                }, 50);
            }
        };
    },

    'intialEducation': function() {
        var user = Meteor.users.findOne({'profile.slug': slug});
        //if (user[0].profile.education) {
            //return user[0].profile.education;
        return ["SSC kos ki mama?", "na na na ato chodon diyo na"];
        //}
    },

    'userPressedEdit': function(){
        return Session.get('editProfiel-visible');
    },

    'get_fullName': function(){
        return Session.get('full_name');
    },

    'ProfileData': function () {

        var userSlug = slug;
        var user =  Meteor.users.findOne({'profile.slug' : userSlug });
        console.log(user);
        return user;

        //return {
        //    'name': 'Sakib Hasan',
        //    'age' : 23,
        //    'sex' : 'male',
        //    'location': 'Dhaka, Bangladesh',
        //    'education': [
        //        {   'schoolName': 'MD pur govt high school',
        //            'time'      : '2001-2009',
        //            'program'  : 'SSC'
        //        },
        //        {   'schoolName': 'Dhaka City College',
        //            'time'      : '2009-2011',
        //            'program'  : 'HSC'
        //        },
        //        {   'schoolName': 'BRAC University',
        //            'time'      : '2012-2016',
        //            'program'  : 'CSE'
        //        }
        //    ],
        //    'works': [
        //        {   'company'   : 'Google',
        //            'time'      : '2017-Present',
        //            'designation'  : 'Coder'
        //        }
        //    ],
        //    'profilePicture': 'http://lorempixel.com/150/150/people/',
        //    'email' : 'ajobbalok22@gmail.com',
        //
        //};
    },
});
Template['profile'].events({
    "click .glyphicon-pencil": function (e) {
        // Prevent default browser form submit
        e.preventDefault();
        $(e.currentTarget).parents('.edit').html("<input type='text' name='"+ $(e.currentTarget).attr("name")+"' value='"+ $(e.currentTarget).attr("current")+"' >");
    },

    "submit .edit": function (e) {
        // Prevent default browser form submit
        e.preventDefault();
        var fieldname = String($(e.currentTarget).children('input')[0].name);
        var value = $(e.currentTarget).children('input')[0].value;
        var result = Meteor.call("updateUserInfo", fieldname, value);

        //var $set = {};
        //$set['profile.' + fieldname] = value;
        ////$(e.currentTarget).parents('.edit').html("test");
        //if(Session.get('full_name')){
        //    Session.set('full_name', value);
        //}else{
        //    Session.set('full_name', value);
        //}
        //console.log("===============");
        //$(e.currentTarget).html("");
        //console.log("===============");
        //Meteor.users.update(
        //    {_id:Meteor.user()._id},
        //    {$set: $set}
        //);


        // console.log("after update: "+$(e.currentTarget));
        // $(e.currentTarget).html("<span name=\""+fieldname+"\" current=\""+value+"\" class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span>");
        // $(e.currentTarget).html(Meteor.render('profile'));
        // console.log("done");
    }
});

Session.set('full_name', '');