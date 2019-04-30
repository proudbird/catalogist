const catalogist = module.exports = {};

catalogist.list     = require("./lib/list");
catalogist.listDeep = require("./lib/listDeep");
catalogist.tree     = require("./lib/tree");

catalogist.listSync     = require("./lib/listSync");
catalogist.listDeepSync = require("./lib/listDeepSync");
catalogist.treeSync     = require("./lib/treeSync");