/** @jsx React.DOM */

var React = require('react');
var File = require('./file.react');
var Message = React.createClass({
  render: function() {
    var message = this.props.message;
    var attachments = [];
    var avatar = message.participantAvatar ||  chrome.extension.getURL('../images/avatar.jpeg');
    // message.files.forEach(function(file, index) {
    //   if (file.name !== "noname") { // edge case: file has no name or type.
    //     file.attid = index+1;
    //     file.read = message.read;
    //     files.push(
    //       <File file={file}/>
    //     );
    //   }
    // });
    var date = new Date(message.date).toDateString();
    return (
      <div className="message-participant">
        <span className="participant-gravatar">
        <img src={avatar} alt="avatar" />
        </span>
        <span className="participant-name">
          {this.from()}
        </span>
        <span className="message-time"> at {date}</span>
      </div>
    )
  },
  from: function() {
    var from = this.props.message.from.split("<");
    if(from[0].length > 1) return from[0].split("@")[0];
    if(from[1]) {
      from = from[1].substring(0, from[1].length - 1);
      console.log(from.split("@")[0])
      return from.split("@")[0];
    }
    return ""
  }
});

module.exports = Message;
