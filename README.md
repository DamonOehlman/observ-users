# observ-users

This is a simple observable data structure (an
[`observ-varhash`](https://github.com/nrw/observ-varhash)) that can be used
to report on the names of the participants connected to a room when working
with [`rtc-quickconnect`](https://github.com/rtc-io/rtc-quickconnect).

It does  require that people provide a `uid` and `name` attribute as part of
their quickconnect profile information, and once they have they will be
reported as part of this list.


[![NPM](https://nodei.co/npm/observ-users.png)](https://nodei.co/npm/observ-users/)

[![Build Status](https://img.shields.io/travis/DamonOehlman/observ-users.svg?branch=master)](https://travis-ci.org/DamonOehlman/observ-users) [![bitHound Score](https://www.bithound.io/github/DamonOehlman/observ-users/badges/score.svg)](https://www.bithound.io/github/DamonOehlman/observ-users) 

## Example Usage

```js
var cuid = require('cuid');
var ObservUsers = require('observ-users');
var quickconnect = require('rtc-quickconnect');
var randomName = require('random-name');

var qc = quickconnect('https://switchboard.rtc.io/', { room: 'userhash-test' });
var users = ObservUsers(qc);

// report changes in the structure
users(function(data) {
  console.log('user registry changed: ', data);
});

qc.profile({ uid: cuid(), name: randomName() });

```

## License(s)

### ISC

Copyright (c) 2015, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
