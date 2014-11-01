/** @jsx React.DOM */

var React = require('react');
var Thread = require('./thread.react');
var ThreadGroup = React.createClass({
  render: function() {
    var threads = [];
    this.props.group.threads.forEach(function(thread) {
      threads.push(
        <Thread thread={thread}/>
      );
    });
    return (
      <div className="thread-group">
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
