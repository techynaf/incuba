Messages = new Mongo.Collection("messages");

Messages.allow({
    'insert' : function(){
        return true;
    }
});