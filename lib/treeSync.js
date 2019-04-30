listDeepSync = require("./listDeepSync");
_identity    = require("./_identity");

module.exports = function treeSync(dir, iteratee = _identity, options = {}) {
  if(typeof iteratee === 'object') {
    callback = options;
    options  = iteratee;
    iteratee = _identity;
  }
  options.childrenAlias = options.childrenAlias || "children";

  return listDeepSync(dir, iteratee, options);
}