Template['singleArticle'].helpers({
    'article' : function () {
        var articleSlug = slug;
        console.log(articleSlug);
        var article =  Articles.find({slug: articleSlug}).fetch();
        console.log(article);
        return article[0];
    }
});

Template['singleArticle'].events({
});
