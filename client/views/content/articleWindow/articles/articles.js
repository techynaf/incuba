Template['articles'].helpers({
    'article' : function () {
        return getArticles();
    },
});


Template['articles'].events({
});

function getArticles(){
    if(Session.get('tag')){
        return Articles.find({
            tags: Session.get('tag')
        });
    }else{
        return Articles.find({},{sort:{createdAt:-1}});
    }

}