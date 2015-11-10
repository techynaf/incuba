Template['profile'].helpers({
    'ProfileData' : function () {
        return {
            'name': 'Sakib Hasan',
            'age' : 23,
            'sex' : 'male',
            'location': 'Dhaka, Bangladesh',
            'education': [
                {   'schoolName': 'MD pur govt high school',
                    'time'      : '2001-2009',
                    'program'  : 'SSC'
                },
                {   'schoolName': 'Dhaka City College',
                    'time'      : '2009-2011',
                    'program'  : 'HSC'
                },
                {   'schoolName': 'BRAC University',
                    'time'      : '2012-2016',
                    'program'  : 'CSE'
                }
            ],
            'works': [
                {   'company'   : 'Google',
                    'time'      : '2017-Present',
                    'designation'  : 'Coder'
                }
            ],
            'profilePicture': 'http://lorempixel.com/150/150/people/',
            'email' : 'ajobbalok22@gmail.com',

        };
    },
});
Template['profile'].events({
});
