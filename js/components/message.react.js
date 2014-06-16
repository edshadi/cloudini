/** @jsx React.DOM */

var React = require('react');
var File = require('./file.react');
var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <File name={this.props.fileName}/>
        <span className="participant-gravatar">
        <img src={this.props.participantAvatar} alt="avatar" />
        </span>
        <span className="participant-name">
          {this.props.participantName}
        </span>
        <span className="message-time">{this.props.messageTime}</span>
      </div>
    )
  }
});

module.exports = Message;
