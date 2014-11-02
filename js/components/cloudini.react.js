/**
 * @jsx React.DOM
 */

var React = require('react');
var Sidebar = require('./sidebar.react');
var ThreadStore = require('../stores/thread-store');
var Launcher = require('./launcher.react');
var Cloudini = React.createClass({
  getInitialState: function() {
    return {
      threadGroups: {},
      hidden: true
    }
  },

  componentWillMount: function() {
    ThreadStore.on('threadChange', function(groups) {
      this.setState({
        threadGroups: groups
      })
    }.bind(this))
    ThreadStore.fromFirebaseCache();
  },

  render: function() {
    return (
      <div className="cloudini-container">
        {this.state.hidden ? this.renderLauncher() : this.renderSidebar()}
      </div>
    );
  },
  renderLauncher: function() {
    return(<Launcher label="+ C" handleClick={this.showSidebar} />)
  },
  renderSidebar: function() {
    return(<Sidebar threadGroups={this.state.threadGroups} hideSidebar={this.showSidebar}/>);
  },
  showSidebar: function(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  }

});

module.exports = Cloudini;
