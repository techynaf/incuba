Template.write_article.helpers({
    'ArticleSubmitStatus': function(){

    }
});

Template.write_article.events({
    'submit form': function(event) {
        event.preventDefault();
        var title = event.target.title.value;
        var body = event.target.body.value;
        var summary = event.target.summary.value;
        var tags = event.target.tag.value.split(',');

        var createdAt = '';
        //date starts
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        createdAt = day + ' ' + monthNames[monthIndex] + ' ' + year;
        // date ends

        Articles.insert({
            title: title,
            summary: summary,
            tags:tags,
            body: body,
            createdAt: new date(),
            slug: title.replace(/\s+/g, '-').toLowerCase() + '-' + UI._globalHelpers.randomString(10),
            author: Meteor.userId()
        });
        $("#ArticleSubmitMsg").show();
    }
});

Session.set('ArticleSubmitMsg', null);