

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
    },
    'keyup #search-box': _.throttle(function(e) {
        var text = $(e.target).val().trim();
        console.log(text);
        Session.set('searchArticle',text);
        console.log('session is set '+Session.get('searchArticle'));

    }, 200),
});

