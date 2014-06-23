/** @jsx React.DOM */

var React = require('react');
var Faker = require('faker');
var File = React.createClass({
  render: function() {
    var file = this.props.file;
    var fileStatus = file.read ? "new" : "old"
    var classes = ["thread-file", "pdf", fileStatus].join(" ");
    return (
      <div className={classes}>
        <span className="file-icon">{file.type}</span>
        <span className="file-name">{file.name}</span>
        <div className="file-actions">
          <span><a href="#">Preview</a></span>
          <span><a href="#">Download</a></span>
          <span><a href="#">3 Previous Versions</a></span>
        </div>
      </div>
    );
  }
});
module.exports = File;
