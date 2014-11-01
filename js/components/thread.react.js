/** @jsx React.DOM */

var React = require('react');
var Message = require('./message.react');
var Thread = React.createClass({
  render: function() {
    var messages = [];
    var thread = this.props.thread;
    thread.messages.forEach(function(message, index) {
      if(this.mailDeliveryNotice(message)) return; // TODO: this feels weird here, move it.
      messages.push(<Message key={index} message={message} />)
    }.bind(this));
    return (
      <div className="thread">
        {messages}
        <ul className="thread-data">
          <li className="message-envelop"><img src={chrome.extension.getURL("../images/cloudini-envelope.png")} className="envelope" alt="message" /></li>
          <li className="message-title">{this.shortenSubject()}</li>
          <li className="message-count"><span>{thread.messageCount}</span></li>
        </ul>
      </div>
    )
  },

  shortenSubject: function(n) {
    var n = n || 24;
    var subject = this.props.thread.subject;
    return subject.length > n ? subject.substr(0, n-1)+'...' : subject;
  },

  mailDeliveryNotice: function(message) {
    return message.from === "Mail Delivery Subsystem";
  }
});

module.exports = Thread;
