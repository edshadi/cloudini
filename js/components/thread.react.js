/** @jsx React.DOM */

var React = require('react');
var Message = require('./message.react');
var Thread = React.createClass({
  render: function() {
    var messages = [];
    var thread = this.props.thread;
    thread.messages.forEach(function(message, index) {
      messages.push(<Message key={index} message={message} />)
    });
    return (
      <div className="thread">
        {messages}
        <ul className="thread-data">
          <li className="message-envelop"><img src="./images/cloudini-envelope.png" className="envelope" alt="message" /></li>
          <li className="message-title">{this.shortenSubject()}</li>
          <li className="message-count"><span>{thread.messageCount}</span></li>
        </ul>
      </div>
    )
  },

  shortenSubject: function() {
    var n = 16;
    var subject = this.props.thread.subject;
    return subject.length > n ? subject.substr(0, n-1)+'...' : subject;
  }
});

module.exports = Thread;
