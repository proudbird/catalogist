const fs   = require("fs");
const path = require("path");

_getProperties = require("./_getProperties");
_setFefaults   = require("./_setDefaults");
_skip          = require("./_skip");
_identity      = require("./_identity");

module.exports = function listDeep(dir, iteratee = _identity, options = {}, callback) {

  if(typeof iteratee === 'object') {
    callback = options;
    options  = iteratee;
    iteratee = _identity;
  }

  const mainFunction = async function(callback) {
    
    const filelist = [];

    _setFefaults(options);

    function readdir(path) {
      function mainFunction(callback) {
        fs.readdir(path, function(err, files) {
          callback(err, files);
        })
      }
      
      return new Promise(function(resolve, reject) {
        mainFunction(function(error, result) {
            error ? reject(error) : resolve(result);
        });
      });
    }
    
    function  stat(path) {
      function mainFunction(callback) {
        fs.stat(path, function(err, stats) {
          callback(err, stats);
        })
      }
      
      return new Promise(function(resolve, reject) {
        mainFunction(function(error, result) {
            error ? reject(error) : resolve(result);
        });
      });
    }

    async function walk(_filelist, dir, iteratee, options, _root, level) {
      level++;
      if(options.levels && level > options.levels) {
        return;
      }

      const files = await readdir(dir);
      for(let i=0; i<files.length; i++) {
        const fileName = files[i];
        const fullPath = path.join(_root, fileName);
        const stats    = await stat(fullPath);
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
          await walk(nextList, fullPath, iteratee, options, _root, level);
        }
      }
    }

    await walk(filelist, dir, iteratee, options, "", 0);
    callback(null, filelist);
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