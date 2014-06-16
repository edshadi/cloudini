/** @jsx React.DOM */

var React = require('react');
var Message = require('./message.react');
var Thread = React.createClass({
  render: function() {
    var messages = [];
    this.props.messages.forEach(function(message, index) {
      messages.push(<Message key={index} fileName={message.fileName} participantAvatar={message.participantAvatar} participantName={message.participantName} messageTime={message.messageTime}/>)
    });
    return (
      <div className="thread">
        {messages}
        <div className="thread-data">
          <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSVJcRO3VqNvqfSL--sTw2K1JdbqbZXrkXEHGADQ3Ke-CyNw4KB0g" className="envelope" alt="message" />
          <span className="message-title">{this.props.threadTitle}</span>
          <span className="message-count">{this.props.unreadMessagesCount}</span>
        </div>
      </div>
    )
  }
});

module.exports = Thread;
