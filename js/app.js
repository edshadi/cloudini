/** @jsx React.DOM */
// JSON.stringify(groups, null, "  ");
var React = require('react')
  , Cloudini = require('./components/cloudini.react')
  , ThreadStore = require('./stores/thread-store');

var cloudini = document.createElement('div');
cloudini.setAttribute('id', "cloudini");

window.onload = function() {
  document.body.appendChild(cloudini);
  ThreadStore.fromCache(function(threads) {
    React.renderComponent(<Cloudini threadGroups={threads}/>, cloudini);
  })
}
