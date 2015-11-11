Template.write_article.events({
    'submit form': function(event) {
        event.preventDefault();
        var title = event.target.title.value;
        var body = event.target.body.value;

        Articles.insert({
            title: title,
            body: body,
            createdAt: new Date(),
            author: Meteor.user()._id
        });

        console.log("article added");
    }
});