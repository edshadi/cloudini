/** @jsx React.DOM */
// JSON.stringify(groups, null, "  ");
var React = require('react')
  , Cloudini = require('./components/cloudini.react')
  ;

var cloudini = document.createElement('div');
cloudini.setAttribute('id', "cloudini");

window.onload = function() {
  var navbar = document.getElementsByClassName("nH w-asV aiw")[0]
  var navbarParent = navbar.parentElement;
  navbarParent.insertBefore(cloudini, navbar.nextElementSibling);
  React.renderComponent(<Cloudini />, cloudini);
}
