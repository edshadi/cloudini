/** @jsx React.DOM */

var React = require('react');
var Faker = require('faker');
var Attachment = React.createClass({
  render: function() {
    this.attachment = this.props.attachment;
    var fileStatus = this.attachment.read ? "old" : "new";
    var classes = ["thread-file", "pdf", fileStatus].join(" ");
    return (
      <div className={classes}>
        <span className="file-icon">{this.attachment.type}</span>
        <span className="file-name">{this.attachment.name}</span>
        <div className="file-actions">
          <span><a href={this.previewLink()} target="_blank">Preview</a></span>
          <span><a href={this.downloadLink()}>Download</a></span>
          <span><a href="#">3 Versions</a></span>
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
    return "attid="+this.props.attId; // google indexes attachements per message: 0.1, 0.2, etc.
  },

  th: function() {
    return "th="+this.props.attachment.messageId;
  },

  baseActionLink: function() {
    return "https://mail.google.com/mail/u/0/?view=att&ui=2&ik=2453bc22ca";
  }
});
module.exports = Attachment;
