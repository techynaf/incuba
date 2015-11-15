Meteor.publish("articles", function(){
    return Articles.find();
});


Meteor.publish('authors', function() {
    return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish("searchArticle", function(searchValue) {
    Meteor.subscribe("articles");

    if (!searchValue) {
        return Articles.find({});
    }
    console.log("Searching for ", searchValue);
    var cursor = Articles.find(
        { title: {$search: searchValue} },
        {
            /*
             * `fields` is where we can add MongoDB projections. Here we're causing
             * each document published to include a property named `score`, which
             * contains the document's search rank, a numerical value, with more
             * relevant documents having a higher score.
             */
            fields: {
                score: { $meta: "textScore" }
            },
            /*
             * This indicates that we wish the publication to be sorted by the
             * `score` property specified in the projection fields above.
             */
            sort: {
                score: { $meta: "textScore" }
            }
        }
    );
    return cursor;
});
