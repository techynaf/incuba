Template['chatStream'].helpers({
    isMentor: function (sender) {
        return sender === "mentor"
    },
    isUser: function (sender) {
        return sender === "user"
    },
    isSite: function (sender) {
        return sender === "site"
    },
    'chat_messages' : function () {
        return [
            { 'text' : 'Hi, how are you?', 'time' : '08:10 PM', 'sender' : 'mentor' },
            { 'text' : 'Hi, how are you?adasd', 'time' : '08:10 PM', 'sender' : 'user' },
            { 'text' : 'Hi, how are yasdasdasou?', 'time' : '08:10 PM', 'sender' : 'site' },
            { 'text' : 'Hi, asd are you?', 'time' : '08:10 PM', 'sender' : 'mentor' },
            { 'text' : 'Hi, hasdasdasdow are you?', 'time' : '08:10 PM', 'sender' : 'user' },
        ];
    },
});

Template['chatStream'].events({
});
