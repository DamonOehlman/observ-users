var cuid = require('cuid');
var test = require('tape');
var matrix = require('quickconnect-matrix');
var ObservUsers = require('..');
var connections = [];
var registries = [];

test('create a pair of connections', function(t) {
  t.plan(1);
  connections = matrix({ signaller: location.origin }, function(err) {
    t.ifError(err, 'created ok');
  });
});

test('create the observable user list', function(t) {
  t.plan(connections.length);
  registries = connections.map(ObservUsers);
  registries.forEach(function(reg) {
    t.ok(reg && typeof reg.set == 'function', 'is an observable');
  });
});

test('monitor registries for user:0 being updated', function(t) {
  var expected = 2;
  var uid = cuid();
  var stops = registries.map(function(reg, idx) {
    return reg(function(data) {
      if (data && data[uid]) {
        t.equal(data[uid], 'Fred Smith');

        // stop the monitor
        stops[idx]();
      }
    });
  });

  t.plan(2);
  connections[0].profile({
    uid: uid,
    name: 'Fred Smith'
  });
});

test('monitor registries for user:1 being updated', function(t) {
  var expected = 2;
  var uid = cuid();
  var stops = registries.map(function(reg, idx) {
    return reg(function(data) {
      if (data && data[uid]) {
        t.equal(data[uid], 'Amy Smith');

        // stop the monitor
        stops[idx]();
      }
    });
  });

  t.plan(2);
  connections[1].profile({
    uid: uid,
    name: 'Amy Smith'
  });
});

test('close the connections', function(t) {
  t.plan(1);
  connections.splice(0).forEach(function(conn) {
    conn.close();
  });

  t.pass('closed connections');
});
