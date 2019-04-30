    module.exports= function _skip(fileName, options, stats) {
      let skip = false;

      if(options.onlyFolders && !stats.isDirectory()) {
        return true;
      }

      for(let i=0; i<options.ignore.length; i++) {
        if(fileName === options.ignore[i]) {
          skip = true;
          break;
        }
      }

      return skip;
    }