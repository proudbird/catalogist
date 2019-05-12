const path = require("path");

module.exports= function _getProperties(fileName, fullPath, stat, options, dir, _root) {
  const file = {};
  const properties = options.properties;
  if(properties.includes("name")) {
    file.name = path.basename(fileName, path.extname(fileName));
  }
  if(properties.includes("fullName")) {
    file.fullName = fileName;
  }
  if(properties.includes("path")) {
    file.path = options.withSysRoot ? dir : _root;
  }
  if(properties.includes("fullPath")) {
    file.fullPath = options.withSysRoot ? path.join(dir, fileName) : fullPath;
  }    
  if(properties.includes("ext")) {
    file.ext = path.extname(fileName);
  }   

  for(let key in stat) {
    const value = stat[key];
    if(typeof value === "function" && key != "_checkModeProperty" && properties.includes(key)) {
      file[key] = stat[key]();
    } else if(properties.includes(key)) {
      file[key] = stat[key];
    }
  }

  return file;
}