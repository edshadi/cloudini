/** @jsx React.DOM */
// JSON.stringify(groups, null, "  ");
var React = require('react');

var Cloudini = require('./components/cloudini.react');
var Data = require('./stores/data');
var ThreadStore = require('./stores/thread-store');
var cloudini = document.createElement('div');
var gmailThreads = require('./stores/gmailThreads');
cloudini.setAttribute('id', "cloudini");

window.onload = function() {
  document.body.appendChild(cloudini);
  // ThreadStore.allWithAttachements(function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var groups = makeGroups(JSON.parse(body));
  //     debugger;
  //   }
  // })
  React.renderComponent(<Cloudini threadGroups={gmailThreads}/>, cloudini);
}
function makeGroups(gmailThreads) {
  var groups = {};
  gmailThreads.forEach(function(thread) {
    var thread = JSON.parse(thread)[0];
    var date = normalizeDate(thread.lastMessageDate);
    if(date === "Invalid Date" || thread.messages.length === 0) return;
    groups[date] = groups[date] || [];
    groups[date].push(makeThread(thread));
  })
  return groups;
}
function makeThread(gmailThread) {
  return {
    subject: gmailThread.subject,
    messageCount: gmailThread.messageCount,
    messages: makeMessages(gmailThread.messages)
  }
}

function makeMessages(gmailMessages) {
  if(gmailMessages === undefined) return [];
  var messages = [];
  gmailMessages.forEach(function(message){
    messages.push({
      messageId: message.messageId,
      files: makeFiles(message.files, message.read),
      from: normalizeFrom(message.from),
      date: normalizeDate(message.date)
    })
  })
  return messages;

}

function makeFiles(gmailAttachments, read) {
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
function normalizeFrom(from) {
  return from.split("<")[0].trim();
}

function normalizeDate(timestamp) {
  return new Date(timestamp).toDateString();
}

function normalizeFileType(fileName) {
  var fileTypes = fileName.split(".");
  return fileTypes[fileTypes.length-1];
}
