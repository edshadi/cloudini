/** @jsx React.DOM */

var React = require('react');

var Cloudini = require('./components/cloudini.react');
var SidebarHeader = require('./components/sidebar-header.react');
var data = require('./stores/data');
React.renderComponent(<Cloudini header={<SidebarHeader fileStream="inbox"/>} threadGroups={data.makeGroups()}/>, document.getElementById('container'));
