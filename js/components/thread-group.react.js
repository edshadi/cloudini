/** @jsx React.DOM */

var React = require('react');
var Thread = require('./thread.react');
var ThreadGroup = React.createClass({
  render: function() {
    var threads = [];
    this.props.group.threads.forEach(function(thread, index) {
      threads.push(
        <Thread key={index} messages={thread.messages} threadTitle={thread.threadTitle} unreadMessagesCount={thread.unreadMessagesCount}/>
      );
    });
    return (
      <div id="thread-group">
        <div className="thread-group-date">
          {this.props.group.date}
        </div>
        <div className="threads">
          {threads}
        </div>
      </div>
    );
  }
});

module.exports = ThreadGroup;
