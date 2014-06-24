/** @jsx React.DOM */

var React = require('react');
var Message = require('./message.react');
var Thread = React.createClass({
  render: function() {
    var messages = [];
    var thread = this.props.thread;
    var unreadMessagesCount = 0;
    thread.messages.forEach(function(message, index) {
      if(this.mailDeliveryNotice(message)) return; // TODO: this feels weird here, move it.
      if(!message.read) unreadMessagesCount++;
      messages.push(<Message key={index} message={message} />)
    }.bind(this));
    return (
      <div className="thread">
        {messages}
        <ul className="thread-data">
          <li className="message-envelop"><img src="./images/cloudini-envelope.png" className="envelope" alt="message" /></li>
          <li className="message-title">{this.shortenSubject()}</li>
          <li className="message-count"><span>{unreadMessagesCount}</span></li>
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
