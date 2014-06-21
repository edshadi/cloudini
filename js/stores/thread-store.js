var request = require('browser-request')
  , constants = require('../constants/constants');
var ThreadStore = {
  allWithAttachements: function(callback) {
    request("https://script.google.com/macros/s/AKfycbxEbFXgtm2FFQIxEQ0SJrxnFRoI2K7joCoXXIZHr37shqxXShvh/exec", callback);
  }
};


module.exports = ThreadStore;
