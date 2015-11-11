

Template['articleWindow'].helpers({
    'article' : function () {
        return Articles.find({},{sort:{createdAt:-1}});
    },
});

Template['articleWindow'].events({
    'click #tag_button': function(event) {
        event.preventDefault();
        Session.set('tag',event.currentTarget.innerText);
    },
    'click #all_tag_button': function(event) {
        event.preventDefault();
        Session.set('tag',null);
    }
});

