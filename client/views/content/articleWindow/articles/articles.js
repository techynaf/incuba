Template['articles'].helpers({
    'article' : function () {
        return Articles.find({},{sort:{createdAt:-1}});
    },
});

Template['articles'].events({
});
