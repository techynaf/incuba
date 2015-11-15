Template['chatbox'].helpers({
});

Template['chatbox'].events({

    'submit input #chatbox': function (evt, template) {
        console.log("Enter pressed");
        if (evt.which === 13) {
            console.log("Enter pressed");
            //var url = template.find(".newLink").value;
            // add to database
        }
    }
        //var url = template.find(".newLink").value;
        // add to database



    //'submit form': function(event) {
    //    event.preventDefault();
    //    var title = event.target.title.value;
    //    var body = event.target.body.value;
    //    var summary = event.target.summary.value;
    //    var tags = event.target.tag.value.split(',');
    //    Articles.insert({
    //        title: title,
    //        summary: summary,
    //        tags:tags,
    //        body: body,
    //        createdAt: new Date(),
    //        slug: title.replace(/\s+/g, '-').toLowerCase() + '-' + UI._globalHelpers.randomString(10),
    //        author: Meteor.user()._id
    //    });
    //    console.log("article added");
    //}
});
