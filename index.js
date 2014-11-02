var o = require('observable');
var EVENTS = ['peer:announce', 'peer:update', 'local:announce'];

module.exports = function(conference, opts) {
  var knownUsers = {};

  function updateProfile(data) {
    var updateName = knownUsers[data.uid];

    if (! data.uid) {
      return;
    }

    console.log('updating profile: ' + data.uid, knownUsers);
    if (typeof updateName == 'function') {
      return updateName(data.name);
    }

    knownUsers[data.uid] = o(data.name);
  }

  // handle profile updates and announces
  EVENTS.forEach(function(eventName) {
    conference.on(eventName, updateProfile);
  });

  return function(uid) {
    return knownUsers[uid] || (knownUsers[uid] = o());
  };
};
