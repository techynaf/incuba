
Template['searchBar'].helpers({
    'articles' : function () {

    }
});

Template['searchBar'].events({
    "keyup #search-box": _.throttle(function(e) {
        var text = $(e.target).val().trim();
        Session.set('searchArticle',text);
    }, 200)
});

