const fs   = require("fs");
const path = require("path");

_getProperties = require("./_getProperties");
_setFefaults   = require("./_setDefaults");
_skip          = require("./_skip");
_identity      = require("./_identity");

module.exports = function listDeepSync(dir, iteratee = _identity, options = {}) {

  if(typeof iteratee === 'object') {
    callback = options;
    options  = iteratee;
    iteratee = _identity;
  }

  const mainFunction = function() {
    
    const filelist = [];

    _setFefaults(options);

    function walkSync(_filelist, dir, iteratee, options, _root, level) {
      level++;
      if(options.levels && level > options.levels) {
        return;
      }

      const files = fs.readdirSync(dir);
      for(let i=0; i<files.length; i++) {
        const fileName = files[i];
        const fullPath = path.join(dir, fileName);
        const stats    = fs.statSync(fullPath);
        const isDirectory = stats.isDirectory();

        let file;
        if(!_skip(fileName, options, stats) && iteratee(stats)) {
          file = _getProperties(fileName, fullPath, stats, options, dir, _root);
          _filelist.push(file);
        } else {
          continue;
        }

        if(isDirectory) {
          _root = path.join(_root, fileName);
          let nextList = _filelist;
          if(options.childrenAlias) {
            nextList = file[options.childrenAlias] = [];
          }
          walkSync(nextList, fullPath, iteratee, options, _root, level);
        }
      }
    }

    walkSync(filelist, dir, iteratee, options, "", 0);
    return filelist;
  }

  return mainFunction();
}