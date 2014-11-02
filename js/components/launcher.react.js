/**
 * @jsx React.DOM
 */

var React = require('react');

var Launcher = React.createClass({

  render: function() {
    return (
      <a href="#" id="cloudini-launcher" onClick={this.props.handleClick}>
        {this.props.label}
      </a>
    );
  }

});

module.exports = Launcher;
