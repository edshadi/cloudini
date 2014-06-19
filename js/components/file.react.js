/** @jsx React.DOM */

var React = require('react');
var File = React.createClass({
  render: function() {
    var file = this.props.file;
    var classes = ["thread-file", file.status].join(" ");
    var fileIcons = {
      pdf: "http://www.leopoldjones.com/_kepek/icons/pdf.png",
      jpg: "http://www.iconhot.com/icon/png/file-icons-vs-2/256/jpg-2.png",
      png: "http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-4/256/PNG-icon.png",
      doc: "http://www.iconhot.com/icon/png/file-icons-vs-2/256/doc-3.png"
    }
    return (
      <div className={classes}>
        <img src={fileIcons[file.type]} alt={file.type}/>
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
