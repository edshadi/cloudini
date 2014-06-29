/** @jsx React.DOM */
// JSON.stringify(groups, null, "  ");
var React = require('react')
  , Cloudini = require('./components/cloudini.react')
  , CloudiniGmail = require('./gmail/cloudini-gmail')
  ;

var CloudiniApp = {
  init: function() {
    this.createSidebar();
    this.bindEvents();
  },

  createSidebar: function() {
    this.sidebarEl = document.createElement('div');
    this.sidebarEl.setAttribute('id', "cloudini");
  },

  bindEvents: function() {
    window.onload = function() {
      document.body.appendChild(this.sidebarEl);
      React.renderComponent(<Cloudini />, this.sidebarEl);
      CloudiniGmail.init();
    }.bind(this)
  }
}

CloudiniApp.init();
