Template.write_article.events({
    'submit form': function(event) {
        event.preventDefault();
        var title = event.target.title.value;
        var body = event.target.body.value;
        var summary = event.target.summary.value;
        var tags = event.target.tag.value.split(',');
        console.log(tags);
        Articles.insert({
            title: title,
            summary: summary,
            tags:tags,
            body: body,
            createdAt: new Date(),
            author: Meteor.user()._id
        });

        console.log("article added");
    }
});