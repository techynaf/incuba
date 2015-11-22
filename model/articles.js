Articles = new Mongo.Collection("articles");

Articles.allow({
    'insert' : function(title, body){
        return true;
    }
});