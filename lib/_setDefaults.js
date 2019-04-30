module.exports = function _setDefaults(options) {
  options.properties = options.properties || [
    "name", 
    "fullName", 
    "path",
    "fullPath",
    "ext", 
    "size", 
    "mtime",
    "isDirectory"
  ];

  options.ignore = options.ignore || [
    ".git", 
    ".vscode", 
    ".gitignore",
    ".npmignore",
    "node_modules"
  ];

  options.withSysRoot = options.withSysRoot || false;
}