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
            slug: title.replace(/\s+/g, '-').toLowerCase() + '-' + randomString(10),
            author: Meteor.user()._id
        });

        console.log("article added");
    }
});

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}