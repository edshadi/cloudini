var ThreadMaker = {
  threads: [],
  groups: {},
  create: function(data) {
    console.log(data)
    data.forEach(function(t) {
      var thread = {
        id: t.id,
        messages: []
      }
      t.messages.forEach(function(m) {
        var message = {
          snippet: m.snippet
        }
        m.payload.headers.some(function(header) {
          if(header.name == "From") message.from = header.value;
          if(header.name == "Subject") message.subject = header.value;
          if(header.name == "Date") message.date = header.value;
          if(header.name == "Subject") message.subject = header.value;
        }.bind(this));
        m.payload.parts.forEach(function(part) {
          if(part.body.attachmentId){
            var type = part.filename.split(".");
            type = type[1] ? type[1] : type[0];
            message.attachments = [];
            message.attachments.push({
              type: type,
              name: part.filename,
              id: part.body.attachmentId
            })
          }
        });
        thread.messages.push(message);
        thread.date = thread.messages[thread.messages.length-1].date;
        thread.subject = thread.messages[thread.messages.length-1].subject;
        thread.messageCount = thread.messages.length;
        this.threads.push(thread);
      }.bind(this))
    }.bind(this))
    this.makeGroups();
  },
  makeGroups: function() {
    this.threads.forEach(function(thread) {
      this.groups[thread.date] = this.groups[thread.date] || []
      this.groups[thread.date].push(thread);
    }.bind(this))
  }
}

