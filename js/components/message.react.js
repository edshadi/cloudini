/** @jsx React.DOM */

var React = require('react');
var File = require('./file.react');
var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <File file={this.props.file}/>
        <div className="message-participant">
          <span className="participant-gravatar">
          <img src={this.props.participantAvatar} alt="avatar" />
          </span>
          <span className="participant-name">
            {this.props.participantName}
          </span>
          <span className="message-time">{this.props.messageTime}</span>
        </div>
      </div>
    )
  }
});

module.exports = Message;
