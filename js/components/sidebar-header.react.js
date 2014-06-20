/** @jsx React.DOM */

var React = require('react');
var Menu = require('./menu.react');
var SidebarHeader = React.createClass({
  render: function() {
    return (
      <div id="sidebar-header">
        <div classNme="stream-name">File Stream: {this.props.fileStream}</div>
        <Menu/>
      </div>
    );
  }
});

module.exports = SidebarHeader;
