var Observ = require('observ');
var ObservVarHash = require('observ-varhash');
var EVENTS = ['peer:announce', 'peer:update', 'local:announce'];

/**
  # observ-users

  This is a simple observable data structure (an
  [`observ-varhash`](https://github.com/nrw/observ-varhash)) that can be used
  to report on the names of the participants connected to a room when working
  with [`rtc-quickconnect`](https://github.com/rtc-io/rtc-quickconnect).

  It does  require that people provide a `uid` and `name` attribute as part of
  their quickconnect profile information, and once they have they will be
  reported as part of this list.

  ## Example Usage

  <<< examples/simple.js

**/
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

    users.put(data.uid, data.name);
  }

  // handle profile updates and announces
  EVENTS.forEach(function(eventName) {
    conference.on(eventName, updateProfile);
  });

  return users;
};
