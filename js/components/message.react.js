/** @jsx React.DOM */

var React = require('react');
var File = require('./file.react');
var Message = React.createClass({
  render: function() {
    var files = [];
    this.props.files.forEach(function(file, index) {
      files.push(
        <File file={file}/>
      );
    });
    return (
      <div className="message">
        {files}
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
