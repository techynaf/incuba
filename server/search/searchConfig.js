SearchSource.defineSource('Articles', function(searchText, options) {
    var options = {sort: {title: -1}, limit: 20};

    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {title: regExp};
        //return searchText;
        return Articles.find(selector, options).fetch();
    } else {
        //return searchText;
        return Articles.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    var words = searchText.trim().split(/[ \-\:]+/);
    var exps = _.map(words, function(word) {
        return "(?=.*" + word + ")";
    });
    var fullExp = exps.join('') + ".+";
    return new RegExp(fullExp, "i");
}