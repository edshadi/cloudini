/** @jsx React.DOM */

var React = require('react');
var SidebarHeader = React.createClass({displayName: 'SideBarHeader',
  render: function() {
    return (
      React.DOM.div( {id:"sidebar-header"},
        this.props.fileStream
      )
    )
  }
});

module.exports = SidebarHeader;
