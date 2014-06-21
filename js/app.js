/** @jsx React.DOM */

var React = require('react');

var Cloudini = require('./components/cloudini.react');
var data = require('./stores/data');
var ThreadStore = require('./stores/thread-store');
var cloudini = document.createElement('div');
cloudini.setAttribute('id', "cloudini");

window.onload = function() {
  document.body.appendChild(cloudini);
  ThreadStore.allWithAttachements(function (error, response, body) {
    if (!error && response.statusCode == 200) {
      JSON.parse(body).forEach(function(thread) {
        console.log(thread);
      })
      // React.renderComponent(<Cloudini threadGroups={[]}/>, cloudini);
    }
  })
}

// var a = [{"type":"thread","unread":false,"threadId":"146866530f22d5d3","messageCount":10,"lastMessageDate":1402414116000,"inbox":true,"messages":[{"date":1402082685000,"type":"message","from":"Sarah Crain <ms.sarah.crain@gmail.com>","to":"Karim Mantawi <karimelmantawi@gmail.com>, Hanaa Badr <hanaabadr@gmail.com>, rehamshadi@gmail.com, ed shadi <edshadi@gmail.com>","messageId":"14672a40b4b83e3b","files":[{"fileId":"14672a40b4b83e3b:photo 1.JPG","isGoogleAppFile":false,"type":"file","size":115569,"messageId":"14672a40b4b83e3b","name":"photo 1.JPG","threadId":"146866530f22d5d3","contentType":"image/jpeg"},{"fileId":"14672a40b4b83e3b:photo 2.JPG","isGoogleAppFile":false,"type":"file","size":107876,"messageId":"14672a40b4b83e3b","name":"photo 2.JPG","threadId":"146866530f22d5d3","contentType":"image/jpeg"},{"fileId":"14672a40b4b83e3b:photo 3.JPG","isGoogleAppFile":false,"type":"file","size":144963,"messageId":"14672a40b4b83e3b","name":"photo 3.JPG","threadId":"146866530f22d5d3","contentType":"image/jpeg"}],"fromMe":false,"threadId":"146866530f22d5d3","read":false,"subject":"Maryam"}],"subject":"Maryam"}] 
