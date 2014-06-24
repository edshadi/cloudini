var request = require('browser-request')
  , constants = require('../constants/constants')
  , cacheStore = require('./cache-store')
  ;

var makeGroups = function(gmailThreads) {
  var groups = {};
  gmailThreads.forEach(function(thread) {
    // var thread = JSON.parse(thread)[0];
    var date = normalizeDate(thread.lastMessageDate);
    if(date === "Invalid Date" || thread.messages.length === 0) return;
    groups[date] = groups[date] || [];
    groups[date].push(makeThread(thread));
  })
  return groups;
}

var makeThread = function(gmailThread) {
  return {
    subject: gmailThread.subject,
    messages: makeMessages(gmailThread.messages)
  }
}

var makeMessages = function(gmailMessages) {
  if(gmailMessages === undefined) return [];
  var messages = [];
  gmailMessages.forEach(function(message){
    messages.push({
      messageId: message.messageId,
      files: makeFiles(message.files, message.read),
      from: normalizeFrom(message.from),
      date: normalizeDate(message.date),
      read: message.read
    })
  })
  return messages;

}

var makeFiles = function(gmailAttachments, read) {
  var attachments = [];
  gmailAttachments.forEach(function(attachment){
    attachments.push({
      fileId: attachment.fileId,
      name: attachment.name,
      type: normalizeFileType(attachment.name),
      read: read
    })
  })
  return attachments;
}

var normalizeFrom = function(from) {
  return from.split("<")[0].trim();
}

var normalizeDate = function(timestamp) {
  return new Date(timestamp).toDateString();
}

var normalizeFileType = function(fileName) {
  var fileTypes = fileName.split(".");
  return fileTypes[fileTypes.length-1];
}

module.exports = {
  allWithAttachements: function(callback) {
    request("https://script.google.com/macros/s/AKfycbxEbFXgtm2FFQIxEQ0SJrxnFRoI2K7joCoXXIZHr37shqxXShvh/exec", function(error, response, body) {
      var threads = []
      JSON.parse(body).forEach(function(thread){
        var threadJSON = JSON.parse(thread)[0];
        if(typeof threadJSON === 'object') threads.push(threadJSON);
      })
      // console.log(JSON.stringify(threads, null, "  "));
      callback(makeGroups(threads));
    });
  },
  fromCache: function(callback) {
    callback(makeGroups(cacheStore));
  }
};
