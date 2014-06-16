/** @jsx React.DOM */

var React = require('react');
var File = React.createClass({
  render: function() {
    return (
      <div className="thread-file new-file-new-thread">
        {this.props.name}
        <div className="file-action">preview | download</div>
      </div>
    );
  }
});
module.exports = File;
