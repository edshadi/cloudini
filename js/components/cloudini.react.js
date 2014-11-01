/** @jsx React.DOM */

var React = require('react')
  , ThreadGroup = require('./thread-group.react')
  , SidebarHeader = require('./sidebar-header.react')
  , ThreadStore = require('../stores/thread-store')
  ;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      threadGroups: {}
    }
  },

  componentWillMount: function() {
    ThreadStore.on('threadChange', function(groups) {
      this.setState({
        threadGroups: groups
      })
    }.bind(this))
    ThreadStore.fromFirebaseCache();
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

  refresh: function() {
    event.preventDefault();
    ThreadStore.newCache();
  },

  render: function() {
    var groups = [];
    Object.keys(this.state.threadGroups).forEach(function(key) {
      var group = {
        date: key,
        threads: this.state.threadGroups[key]
      }
      groups.push(
        <ThreadGroup key={key} group={group} />
      );
    }.bind(this))
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
