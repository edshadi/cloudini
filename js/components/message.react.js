/** @jsx React.DOM */

var React = require('react');
var Attachment = require('./attachment.react');
var Message = React.createClass({
  render: function() {
    var avatar = this.props.message.participantAvatar ||  chrome.extension.getURL('../images/avatar.jpeg');
    var date = new Date(this.props.message.date).toDateString();
    var attachments = [];
    console.log(this.props.message)
    if(this.props.message.attachments) {
      this.props.message.attachments.forEach(function(attachment) {
        attachment.read = true;
        attachments.push(<Attachment attachment={attachment} />);
      });
    }
    return (
      <div className="message-participant">
        <div className="message">
          {attachments}
        </div>
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
