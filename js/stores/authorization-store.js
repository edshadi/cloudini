var events = require('events')
  , emitter = new events.EventEmitter()
  , constants = require('../constants/constants')
  ;

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.load('gmail', 'v1', function() {

    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me'
    });
    request.execute(function(resp) {
      console.log('google api response: ', resp)
    });
  });
}
module.exports = {
  authorize: function(event) {
    console.log("yo")
    // handleClientLoad();
  }
}
