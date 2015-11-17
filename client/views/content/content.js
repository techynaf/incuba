Template['content'].helpers({
});

Template['content'].events({
});

$(document).ready(function(){
    $("#forward").on('click' , function() {
        $('#ibox_article').removeClass('col-lg-11').addClass('col-lg-8');
        $("#forward").hide();
        $('#ibox_chat').toggle('slide');
    });

    $('#backward').on('click' , function() {
        $('#ibox_chat').toggle( "slide" );
        $('#ibox_article').removeClass('col-lg-8').addClass('col-lg-11');
        $("#forward").show();
    });
});