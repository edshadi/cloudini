/** @jsx React.DOM */

var React = require('react');

var Cloudini = require('./components/cloudini.react');
var Data = require('./stores/data');
var ThreadStore = require('./stores/thread-store');
var cloudini = document.createElement('div');
cloudini.setAttribute('id', "cloudini");

window.onload = function() {
  document.body.appendChild(cloudini);
  ThreadStore.allWithAttachements(function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var groups = makeGroups(JSON.parse(body));
      React.renderComponent(<Cloudini threadGroups={groups}/>, cloudini);
    }
  })
  // console.log(Data.makeThread().toString());
}

function makeGroups(gmailThreads) {
  var groups = {};
  gmailThreads.forEach(function(thread) {
    var thread = JSON.parse(thread)[0];
    var date = normalizeDate(thread.lastMessageDate);
    groups[date] = groups[date] || [];
    groups[date].push(makeThread(thread));
  })
  return groups;
}
function makeThread(gmailThread) {
  return {
    threadTitle: gmailThread.subject,
    unreadMessagesCount: gmailThread.messageCount,
    messages: makeMessages(gmailThread.messages)
  }
}

function makeMessages(gmailMessages) {
  if(gmailMessages === undefined) return [];
  var messages = [];
  gmailMessages.forEach(function(message){
    messages.push({
      id: message.messageId,
      files: makeFiles(message.files, message.read),
      participantName: normalizeFrom(message.from),
      messageTime: normalizeDate(message.date)
    })
  })
  return messages;

}

function normalizeFrom(from) {
  return from.split("<")[0].trim();
}

function normalizeDate(timestamp) {
  return new Date(timestamp).toDateString();
}
function makeFiles(gmailAttachments, messageStatus) {
  var attachments = [];
  gmailAttachments.forEach(function(attachment){
    attachments.push({
      id: attachment.fileId,
      name: attachment.name,
      type: attachment.contentType,
      status: messageStatus
    })
  })
  return attachments;
}
