/** @jsx React.DOM */

var React = require('react');
var Authorize = React.createClass({
  render: function() {
    return (
      <button id="authorize-button" style="visibility: hidden">Authorize</button>
    );
  }
});

module.exports = Authorize;
