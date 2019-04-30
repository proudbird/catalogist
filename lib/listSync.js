listDeepSync = require("./listDeepSync");
_identity    = require("./_identity");

module.exports = function listSync(dir, iteratee = _identity, options = {}) {
  if(typeof iteratee === 'object') {
    callback = options;
    options  = iteratee;
    iteratee = _identity;
  }
  options.levels = 1;

  return listDeepSync(dir, iteratee, options);
}