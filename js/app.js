/** @jsx React.DOM */

var React = require('react');

var Cloudini = require('./components/cloudini.react');
var SidebarHeader = require('./components/sidebar-header.react');
var data = require('./stores/data');
document.create
var cloudiniSidebar = document.createElement('div');
cloudiniSidebar.setAttribute('id', "cloudini");
React.renderComponent(<Cloudini header={<SidebarHeader fileStream="INBOX"/>} threadGroups={data.makeGroups()}/>, cloudiniSidebar);
window.onload = function() {
  document.body.appendChild(cloudiniSidebar);
}
