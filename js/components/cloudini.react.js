/** @jsx React.DOM */

var React = require('react');
var ThreadGroup = require('./thread-group.react');
var SidebarHeader = require('./sidebar-header.react');

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
    for (var key in this.state.threadGroups) {
      console.log(this.state.threadGroups)
      var group = {
        date: key,
        threads: this.state.threadGroups[key]
      }
      groups.push(
        <ThreadGroup key={key} group={group} />
      );
    }
    return (
      <div id="sidebar">
        <SidebarHeader fileStream="INBOX"/>
        <div id="sidebar-body">
          {groups}
        </div>
      </div>
    );
  }
});

module.exports = Cloudini;
