'use strict';

var GitHub = require('github-base');
var isObject = require('isobject');
var commits = require('commits');

module.exports = function(owner, repo, options) {
  var opts = normalize(owner, repo, options);
  var github = new GitHub(opts);
  var url = '/repos/:owner/:repo/git/trees/:sha';

  if (opts.recursive === true) {
    url += '?recursive=1';
  }

  return commits(opts)
    .then(function(commits) {
      if (!opts.sha) {
        opts.sha = commits[0].sha;
      }

      return new Promise(function(resolve, reject) {
        github.get(url, opts, function(err, files) {
          if (err) {
            reject(err);
            return;
          }

          resolve(files);
        });
      });
    });
};

function normalize(owner, repo, options) {
  if (isObject(repo)) {
    options = Object.assign({}, repo, options);
    var segs = owner.split('/');
    owner = segs.shift();
    repo = segs.pop();
  } else if (isObject(owner)) {
    options = Object.assign({}, owner, repo, options);
    owner = null;
    repo = null;
  }
  var defaults = {owner: owner, repo: repo};
  return Object.assign({}, defaults, options);
}
