/** @jsx React.DOM */

var React = require('react');
var File = require('./file.react');
var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    var files = [];
    var avatar = message.participantAvatar || './images/avatar.jpeg';
    message.files.forEach(function(file, index) {
      if (file.name !== "noname") { // edge case: file has no name or type.
        file.attid = index+1;
        file.read = message.read;
        files.push(
          <File file={file}/>
        );
      }
    });
    return (
      <div className="message">
        {files}
        <div className="message-participant">
          <span className="participant-gravatar">
          <img src={avatar} alt="avatar" />
          </span>
          <span className="participant-name">
            {message.from}
          </span>
          <span className="message-time">{message.date}</span>
        </div>
      </div>
    )
  }
});

module.exports = Message;
