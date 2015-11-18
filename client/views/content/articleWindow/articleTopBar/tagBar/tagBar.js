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

});
