/** @jsx React.DOM */

var React = require('react')
  , ThreadGroup = require('./thread-group.react')
  , SidebarHeader = require('./sidebar-header.react')
  ;

var Sidebar = React.createClass({
  render: function() {
    var groups = [];
    Object.keys(this.props.threadGroups).forEach(function(key) {
      var group = {
        date: key,
        threads: this.props.threadGroups[key]
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
module.exports = Sidebar;
