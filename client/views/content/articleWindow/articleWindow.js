

Template['articleWindow'].helpers({
    'article' : function () {
        return Articles.find({},{sort:{createdAt:-1}});
    },
    'backwardPressed': function(){
        if(Session.get('backwardPressed')){
            Session.set('forwardClicked', false);
            $('#ibox_article').removeClass('col-lg-8').addClass('col-lg-11');
            $("#forward").show();
            $('#ibox_chat').hide();
            $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
        }
    },
    'forwardClicked': function(){
        if(Session.get('forwardClicked')){
            Session.set('backwardPressed', false);
            $("#forward").hide();
            $('#ibox_chat').show();
            $('#ibox_article').removeClass('col-lg-11').addClass('col-lg-8');
            $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
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

Session.set('forwardClicked', null);
Session.set('backwardPressed', null);
