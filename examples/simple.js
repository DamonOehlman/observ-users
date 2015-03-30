var cuid = require('cuid');
var ObservUsers = require('..');
var quickconnect = require('rtc-quickconnect');
var randomName = require('random-name');

var qc = quickconnect('https://switchboard.rtc.io/', { room: 'userhash-test' });
var users = ObservUsers(qc);

// report changes in the structure
users(function(data) {
  console.log('user registry changed: ', data);
});

qc.profile({ uid: cuid(), name: randomName() });
