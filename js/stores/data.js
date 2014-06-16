var Data = {
  makeMessage: function() {
    return {
      fileName: this.makeName('file'),
      participantName: "shadi",
      participantAvatar: "https://secure.gravatar.com/avatar/519f2826b9395b79e5e12b98a80947a5.png?r=PG&d=mm&s=50",
      messageTime: "Mrach 22nd 2014"
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
      var date = new Date(today.getTime() + (groupCount * 24 * 60 * 60 * 1000));
      groups.push(this.makeGroup({date: date.toDateString()}));
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
