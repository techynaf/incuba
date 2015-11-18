Template['tagBar'].helpers({
    'tags' : function () {
        var data = Articles.find({},{fields:{tags:1}}).fetch();
        var mainArray = [];
        for(key in data){
            var array = data[key].tags;
            for(key3 in array){
                mainArray.push(array[key3]);
            }
        }
        return _.uniq(mainArray);
    },
});

Template['tagBar'].events({
    'click .tag_button': function(event) {
        console.log("i am being called. ok?");
        event.preventDefault();
        Session.set('tag',event.currentTarget.innerText);
    },
    'click #all_tag_button': function(event) {
        event.preventDefault();
        Session.set('tag',null);
    }
});
