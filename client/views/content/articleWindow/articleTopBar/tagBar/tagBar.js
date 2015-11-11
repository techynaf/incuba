Template['tagBar'].helpers({
    'tags' : function () {
        var query = Articles.find();
        console.log(query);
        return query;
    },
});

Template['tagBar'].events({
});
