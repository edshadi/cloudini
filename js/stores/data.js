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
    future -= days * 24 * 60 * 60 * 1000; // some time from now to N days ago, in milliseconds
    date.setTime(future)

    return date;
}


var Data = {
  DAY_RANGE: 7,
  MESSAGE_RANGE: 5,
  GROUP_RANGE: 5,
  THREAD_RANGE: 5,
  
  makeMessage: function() {
    var user = fakeUser();
    var fileName = Faker.Lorem.words(1)[0] + '.pdf';
    var messageTime = timeAgo(Faker.random.number(this.GROUP_RANGE)).toDateString();
    var fileStatuses = ["old", "new", "new-version"];
    var fileTypes = ['pdf', 'jpg', 'png', 'doc']
    return {
      files: [
        {
          name: fileName,
          type: fileTypes[Faker.random.number(fileTypes.length)],
          status: fileStatuses[Faker.random.number(fileStatuses.length)]
        }
      ],
      participantName: user.name,
      participantAvatar: user.avatar,
      messageTime: messageTime
    }
  },

  makeThread: function() {
    var messageCount = Math.floor((Math.random() * this.MESSAGE_RANGE) + 1);
    var messages = [];
    var i = 0;
    while(i < messageCount) {
      messages.push(this.makeMessage());
      i++;
    }
    
    return {
      threadTitle: Faker.Lorem.words(1)[0],
      unreadMessagesCount: messageCount,
      messages: messages
    }
  },

  makeGroup: function(opts) {
    var threadCount = Math.floor((Math.random() * this.THREAD_RANGE) + 1);
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
    var groupCount = Math.floor((Math.random() * this.GROUP_RANGE) + 1);
    var groups = [];
    var index = 0;
    while(index < groupCount) {
      var date = timeAgo(index).toDateString();
      groups.push(this.makeGroup({date: date}));
      index++;
    }
    
    return groups;
  }
}

module.exports = Data;
