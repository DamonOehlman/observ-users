var Observ = require('observ');
var ObserVarHash = require('observ-varhash');
var EVENTS = ['peer:announce', 'peer:update', 'local:announce'];

module.exports = function(conference, opts) {
  var users = ObservVarHash({});

  function updateProfile(data) {
    var user;
    if ((! data.uid) || (data.name === undefined)) {
      return;
    }

    // get the user for the specified uid
    user = users.get(data.uid);
    if (user && typeof user.set == 'function') {
      return user.set(data.name);
    }

    users.set(data.uid, data.name);
  }

  // handle profile updates and announces
  EVENTS.forEach(function(eventName) {
    conference.on(eventName, updateProfile);
  });

  return users;
};
