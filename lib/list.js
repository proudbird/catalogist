listDeep  = require("./listDeep");
_identity = require("./_identity");

module.exports = function list(dir, iteratee = _identity, options = {}, callback) {
  if(typeof iteratee === 'object') {
    callback = options;
    options  = iteratee;
    iteratee = _identity;
  }
  options.levels = 1;

  async function mainFunction(callback) {
    try {
      const list = await listDeep(dir, iteratee, options, callback);
      callback(null, list);
    } catch(err) {
      callback(err);
    }
  }

  if(typeof callback === 'function') {
    return mainFunction(callback);
  }

  return new Promise(function(resolve, reject) {
    mainFunction(function(error, result) {
        error ? reject(error) : resolve(result);
    });
  });
}