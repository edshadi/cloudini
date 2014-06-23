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
        <div className="thread-data">
          <img src="./images/cloudini-envelope.png" className="envelope" alt="message" />
          <span className="message-title">{thread.subject}</span>
          <span className="message-count">{thread.messageCount}</span>
        </div>
      </div>
    )
  }
});

module.exports = Thread;
