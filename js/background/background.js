var App = (function() {
  return {
    rawMessages: [],
    rawThreads: [],
    getAuthToken: function() {
      chrome.identity.getAuthToken({'interactive': true }, function (accessToken) {
        this.authToken = accessToken;
        // this.getMessageList();
        this.getThreadList()
      }.bind(this))
    },
    getMessageList: function() {
      var url = 'https://www.googleapis.com/gmail/v1/users/me/messages/?q="in:inbox has:attachment"'
      var success = function(e) {
        this.messages = JSON.parse(e.target.responseText).messages;
        this.getTopMessages();
      }.bind(this);

      var fail = function(e) {
        console.log(this, this.status, this.response, this.getAllResponseHeaders());
      };
      this.request('GET', url, success, fail)
    },
    getThreadList: function() {
      var url = 'https://www.googleapis.com/gmail/v1/users/me/threads/?q="in:inbox has:attachment"'
      var success = function(e) {
        this.threads = JSON.parse(e.target.responseText).threads;
        this.getTopThreads();
      }.bind(this);

      var fail = function(e) {
        console.log(this, this.status, this.response, this.getAllResponseHeaders());
      };
      this.request('GET', url, success, fail)
    },
    getTopMessages: function() {
      this.messages.forEach(function(message) {
        this.getMessage(message.id)
      }.bind(this))
      this.archive();
    },
    getTopThreads: function() {
      this.threads.forEach(function(thread) {
        this.getThread(thread.id)
      }.bind(this))
      this.archiveGroups();
    },
    getMessage: function(id) {
      var url = 'https://www.googleapis.com/gmail/v1/users/me/messages/'+id;
      var success = function(e) {
        var message = JSON.parse(e.target.responseText);
        this.rawMessages.push(message);
        console.log(message);
      }.bind(this);
      var fail = function(e) {
        console.log(this, this.status, this.response, this.getAllResponseHeaders());
      };
      this.request('GET', url, success, fail)
    },
    getThread: function(id) {
      var url = 'https://www.googleapis.com/gmail/v1/users/me/threads/'+id;
      var success = function(e) {
        var thread = JSON.parse(e.target.responseText);
        this.rawThreads.push(thread);
      }.bind(this);
      var fail = function(e) {
        console.log(this, this.status, this.response, this.getAllResponseHeaders());
      };
      this.request('GET', url, success, fail)
    },
    getProfile: function(callback) {
      var url = 'https://www.googleapis.com/gmail/v1/users/me/profile';
      this.request('GET', url, function(xhr) {
        this.profile = JSON.parse(xhr.target.responseText);
        console.log(this.profile)
        callback();
      }.bind(this))
    },
    archiveThreads: function() {
      this.getProfile(function() {
        var fb = new Firebase('https://cloudini-extension.firebaseio.com/users')
        var data = {}
        var username = this.profile.emailAddress.split("@")[0];
        data[username] = {
          threads: this.rawThreads
        }
        fb.set(data);
      }.bind(this))
    },
    archiveGroups: function() {
      // console.log(this.rawThreads)
      this.getProfile(function() {
        ThreadMaker.create(this.rawThreads);
        var fb = new Firebase('https://cloudini-extension.firebaseio.com/users')
        var data = {}
        var username = this.profile.emailAddress.split("@")[0];
        data[username] = {
          threads: ThreadMaker.groups
        }
        fb.set(data);
      }.bind(this))
    },
    archive: function() {
      this.getProfile(function() {
        var fb = new Firebase('https://cloudini-extension.firebaseio.com/users')
        var data = {}
        var username = this.profile.emailAddress.split("@")[0];
        data[username] = {
          messages: this.rawMessages
        }
        fb.set(data);
      }.bind(this))
    },
    request: function(method, url, success, fail, params) {
      var messageXhr = new XMLHttpRequest();
      messageXhr.open(method, url, true);
      messageXhr.setRequestHeader('Authorization', 'Bearer ' + this.authToken);
      messageXhr.onload = success;
      messageXhr.onerror = fail;
      messageXhr.send();
    }

  }
}())
App.getAuthToken()
