Template['singleArticle'].helpers({
    'article' : function () {
        var articleSlug = slug;
        var article =  Articles.find({slug: articleSlug}).fetch();
        return article[0];
    },
    ownArticle: function(){
        if(Accounts.user()) {
            var articleSlug = slug;
            var article = Articles.find({slug: articleSlug}).fetch();
            if ( typeof article[0] === "undefined") {
                console.log(typeof article[0]);
            }else{
                if(article[0].author == Accounts.user()._id){
                    console.log("SET");
                    Session.set("DeleteButtonShow", true);
                }
            }
        }
    },
    checkOwner: function(){
        if(Session.get("DeleteButtonShow")){
            return true;
        }else{
            return false;
        };
    }
});

Template['singleArticle'].events({
    'click #deleteButton':function(){
        console.log("delet clciked"+slug);
        var articleSlug = slug;
        var article =  Articles.find({slug: articleSlug}).fetch();
        if ( typeof article[0] === "undefined") {

        }else{
            Articles.remove({"_id": article[0]._id});
            Router.go('/');
        }
    }
});

Session.set("DeleteButtonShow", false);