var ThreadStore = require('../stores/thread-store')
;
module.exports = {
  init: function() {
    this.currentNumUnread = this.numUnread();
    console.log(this.currentNumUnread);

    var observer = new MutationObserver(function(mutations) {
      var changed = mutations.some(function(mut) {
        var title = /\((\d+)\)/.exec(mut.target.title);
        return title && this.currentUnread !== parseInt(title[1]);
      })
      if(changed) {
        console.log(this.numUnread());
        ThreadStore.allWithAttachements();
      }
    }.bind(this));

    var config = { subtree: true, attributeFilter: ["tabindex"]}
    observer.observe(this.navigationEl(), config);
  },

  inboxEl: function() {
    return document.querySelector('a[href$="#inbox"][title^="Inbox"]');
  },

  navigationEl: function() {
    return document.querySelector('div[role="navigation"]');
  },

  numUnread: function() {
    var title = this.inboxEl().title;
    var count = /\((\d+)\)/.exec(title);
    return (count && count[1]) ? parseInt(count[1]) : 0;
  }
}

