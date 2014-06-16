var Faker = require('faker');
var fakeUser = function() {
  return {
    name: Faker.Name.findName(),
    avatar: Faker.Image.avatar()
  }
}

var timeAgo = function(days) {
    var date = new Date();
    var future = date.getTime();
    future -= Faker.random.number(days) * 24 * 60 * 60 * 1000; // some time from now to N days ago, in milliseconds
    date.setTime(future)

    return date.toJSON();
}

var Data = {
  makeMessage: function() {
    var user = fakeUser();
    var fileName = Faker.Lorem.words(1)[0] + '.pdf';
    var messageTime = timeAgo();
    return {
      fileName: fileName,
      participantName: user.name,
      participantAvatar: user.avatar,
      messageTime: messageTime
    }
  },

  makeThread: function() {
    var messageCount = Math.floor((Math.random() * 5) + 1);
    var messages = [];
    var i = 0;
    while(i < messageCount) {
      messages.push(this.makeMessage());
      i++;
    }
    
    return {
      threadTitle: this.makeName('thread'),
      unreadMessagesCount: messageCount,
      messages: messages
    }
  },

  makeGroup: function(opts) {
    var threadCount = Math.floor((Math.random() * 5) + 1);
    var threads = [];
    while(threadCount > 0) {
      threads.push(this.makeThread());
      threadCount--;
    }
    
    return {
      date: opts.date,
      threads: [this.makeThread()]
    }
  },

  makeGroups: function() {
    var today = new Date();
    var groupCount = Math.floor((Math.random() * 3) + 1);
    var groups = [];
    while(groupCount > 0) {
      var date = timeAgo(groupCount)
      groups.push(this.makeGroup({date: date}));
      groupCount--;
    }
    
    return groups;
  },

  makeName: function(type) {
    var text = "";
    var possible;
    switch (type) {
    case 'thread':
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;
    case 'file':
      possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    default:
      possible = "abcdefghijklmnopqrstuvwxyz";
    }
      
    for( var i=0; i < 5; i++ ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

module.exports = Data;
