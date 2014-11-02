var request = require('browser-request')
  , constants = require('../constants/constants')
  , cacheStore = require('./cache-store')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , Firebase = require("firebase")
  , firebaseCache = require('./firebase-cache')
  , threadMaker = require('./thread-maker')
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
    var fb = new Firebase('https://cloudini-extension.firebaseio.com/')
    fb.child("users/edshadi").on("value", function(snapshot) {
      console.log(snapshot.val());  // Alerts "San Francisco"
    });
  },
  fromCache: function(callback) {
    var groups = makeGroups(cacheStore);
    // callback(groups);
    this.emit('threadChange', groups);
  },
  fromFirebaseCache: function(callback) {
    var fb = new Firebase('https://cloudini-extension.firebaseio.com/')
    fb.child("users/edshadi").on("value", function(snapshot) {
      this.emit('threadChange', snapshot.val().groups);
    }.bind(this));
  },
  newCache: function() {
    var groups = makeGroups(cacheStore);
    groups[normalizeDate(1402414116000)].push({
      subject: "testing refresh",
      messages: []
    })
    this.emit('threadChange', groups);
  },
  on: emitter.on,
  emit: emitter.emit
};
