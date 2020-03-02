
var baseURL = window.location.href;

module.exports = {
  getURL: function() {
    if (!baseURL.includes('localhost')) {
      var rx = /^([http|https]+\:\/\/[a-z]+)([^/]*)/;
      var arr = rx.exec(baseURL);
      if (arr.length > 0) {
          //add -api to the sub domain for API requests
          return arr[1]+'-api'+arr[2]
      }
    } else {
      return 'http://localhost:3001'
    }
  }
} 