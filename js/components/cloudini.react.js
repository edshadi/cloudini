/** @jsx React.DOM */

var React = require('react');
var ThreadGroup = require('./thread-group.react');

var Cloudini = React.createClass({
  getInitialState: function() {
    return {
      threadGroups: this.props.threadGroups
    }
  },

  handleClick: function() {
    event.preventDefault();

    var threadGroups = this.state.threadGroups;
    threadGroups.push(
      {}
    );
    this.setState({
      threadGroups: threadGroups
    })
  },

  render: function() {
    var groups = [];
    this.state.threadGroups.forEach(function(group, index) {
      groups.push(
        <ThreadGroup key={index} group={group} />
      );
    })
    return (
      <div id="sidebar">
        {this.props.header}
        <div id="sidebar-body">
          {groups}
        </div>
      </div>
    );
  }
});

module.exports = Cloudini;
