/** @jsx React.DOM */

var React = require('react');
var Faker = require('faker');
var File = React.createClass({
  render: function() {
    this.file = this.props.file;
    var fileStatus = this.file.read ? "old" : "new";
    var classes = ["thread-file", "pdf", fileStatus].join(" ");
    return (
      <div className={classes}>
        <span className="file-icon">{this.file.type}</span>
        <span className="file-name">{this.file.name}</span>
        <div className="file-actions">
          <span><a href={this.previewLink()} target="_blank">Preview</a></span>
          <span><a href={this.downloadLink()}>Download</a></span>
          <span><a href="#">3 Previous Versions</a></span>
        </div>
      </div>
    );
  },
  //TODO: unfortunately google doesn't give us a direct way to get the download_url, so some of this
  // is a hack based on inspecting several attachment download_urls. attributes: ui, ik are unknowns but seem
  // to be constant with all attachments. attid is mostly working, but occasionally this number goes crazy.
  downloadLink: function() {
    return [this.baseActionLink(), this.th(), this.attid(), "disp=safe&zw"].join("&")
  },

  previewLink: function() {
    return [this.baseActionLink(), this.th(), this.attid(), "disp=inline&safe=1&zw"].join("&")
  },

  attid: function() {
    return "attid="+this.file.attid/10; // google indexes attachements per message: 0.1, 0.2, etc.
  },

  th: function() {
    return "th="+this.file.fileId.split(":")[0];
  },

  baseActionLink: function() {
    return "https://mail.google.com/mail/u/0/?view=att&ui=2&ik=2453bc22ca";
  }
});
module.exports = File;
