

Template['articleWindow'].helpers({
    'article' : function () {
        return Articles.find({},{sort:{createdAt:-1}});
    },
    'backwardPressed': function(){
        if(Session.get('backwardPressed')){
            Session.set('forwardClicked', false);
            setTimeout(function() {
                $('#ibox_article').removeClass('col-lg-8').addClass('col-lg-11');
            }, 500);
            $("#forward").show();
            $('#ibox_chat').toggle( "slide" );
        }
    },
    'forwardClicked': function(){
        if(Session.get('forwardClicked')){
            Session.set('backwardPressed', false);
            $('#ibox_article').removeClass('col-lg-11').addClass('col-lg-8');
            $("#forward").hide();
            $('#ibox_chat').toggle('slide');
        }
    },
});

Template['articleWindow'].events({

    'keyup #search-box': _.throttle(function(e) {
        var text = $(e.target).val().trim();
        console.log(text);
        Session.set('searchArticle',text);
        console.log('session is set '+Session.get('searchArticle'));

    }, 200),
});

