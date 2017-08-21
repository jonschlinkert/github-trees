'use strict';

var auth = require('./tmp/auth');
var trees = require('./');
var opts = Object.assign({}, auth, {recursive: true});

trees('breakdance/breakdance', opts)
  .then(function(res) {
    console.log(res);
  })
  .catch(console.error)
