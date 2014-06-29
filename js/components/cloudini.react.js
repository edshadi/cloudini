/** @jsx React.DOM */

var React = require('react')
  , ThreadGroup = require('./thread-group.react')
  , SidebarHeader = require('./sidebar-header.react')
  , ThreadStore = require('../stores/thread-store')
  ;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      threadGroups: []
    }
  },

  componentWillMount: function() {
    ThreadStore.on('threadChange', function(groups) {
      console.log("setting state")
      this.setState({
        threadGroups: groups
      })
    }.bind(this))
    ThreadStore.allWithAttachements();
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
        <a href="" className="refresh" onClick={this.refresh}>Refresh</a>
        <SidebarHeader fileStream="INBOX"/>
        <div id="sidebar-body">
          {groups}
        </div>
      </div>
    );
  }
});
