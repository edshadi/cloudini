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
        {this.renderLauncher()}
        {this.renderSidebar()}
      </div>
    );
  },
  renderLauncher: function() {
    return(<Launcher handleClick={this.showSidebar.bind(this)} />)
  },
  renderSidebar: function() {
    if(!this.state.hidden) return(<Sidebar threadGroups={this.state.threadGroups}/>);
  },
  showSidebar: function(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  }

});

module.exports = Cloudini;
