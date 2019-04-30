
# catalogist #

Highly customizable listing files in given path, both synchronously and asynchronously

## Quickstart

```shell
npm install catalogist
```

Then make reference inside yor module...

```javascript
const catalogist = require('catalogist');

const result1 = await catalogist.list(__dirname); 
const result2 = await catalogist.listDeep(__dirname, { levels: 2 }); 
const result3 = await catalogist.tree(__dirname, { childrenAlias: "data" });

// or
catalogist.list(__dirname, result => {
  
}); 
catalogist.listDeep(__dirname, result => {
  
});
catalogist.tree(__dirname, result => {
  
});

// or
const result4 = catalogist.listSync(__dirname);
const result5 = catalogist.listDeepSync(__dirname, { levels: 2 });
const result6 = catalogist.treeSync(__dirname, { childrenAlias: "data" });

```

## API

### list(path, [iteratee], [options], [callback])

Returns an array of objects with files properties by running each file in given `path` thru `iteratee`. The iteratee is invoked with one argument: (stats) - a fs.Stats object provides information about a file (from build-in node.js module ["fs"](https://nodejs.org/api/fs.html#fs_class_fs_stats));

#### Arguments

* `path` - (string) Start directory to list files from
* `[iteratee]` - (Function) The function invoked per iteration
* `[options]` - (Object) The options object:
* `[options.properties]` - (Array) The list of file's properties to return. By default it icludes "name", "fullName", "path", "fullPath", "ext", "size", "mtime", "isDirectory"
* `[options.ignore]` - (Array) The list of files/directories to skip. By default it skips directories ".git", ".vscode", ".gitignore", ".npmignore", "node_modules"
* `[options.onlyFolders]` - (boolen) If it is `true` only folders/directories will be included in list. By default it is `false`
* `[options.withSysRoot]` - (boolen) Specifies, weather the full path to the file has to include system root to the given `path`. By default it is `false`, so the full path starts from given `path`
* `[callback]` - (Function) The callback function, returning two arguments: (err `Error`, list `Array`). If callback is not provided, the method returns `Promiss`

#### Returns 
`Array` - the list of objects with files properties

### listSync(path, [iteratee], [options])

The same as `list`, but synchronously;

### listDeep(path, [iteratee], [options], [callback])

Returns an array of objects with files properties by running recursively each file/directory in given `path` thru `iteratee`. The iteratee is invoked with one argument: (stats) - a fs.Stats object provides information about a file (from build-in node.js module ["fs"](https://nodejs.org/api/fs.html#fs_class_fs_stats));

#### Arguments

* `path` - (string) Start directory to list files from
* `[iteratee]` - (Function) The function invoked per iteration
* `[options]` - (Object) The options object:
* `[options.properties]` - (Array) The list of file's properties to return. By default it icludes "name", "fullName", "path", "fullPath", "ext", "size", "mtime", "isDirectory"
* `[options.ignore]` - (Array) The list of files/directories to skip. By default it skips directories ".git", ".vscode", ".gitignore", ".npmignore", "node_modules"
* `[options.onlyFolders]` - (boolen) If it is `true` only folders/directories will be included in list. By default it is `false`
* `[options.withSysRoot]` - (boolen) Specifies, weather the full path to the file has to include system root to the given `path`. By default it is `false`, so the full path starts from given `path`
* `[options.levels]` - (number) Specifies, how deep to list directories. By default it is `undefined`, so the method returns all child files/directories
* `[callback]` - (Function) The callback function, returning two arguments: (err `Error`, list `Array`). If callback is not provided, the method returns `Promiss`

#### Returns 
`Array` - the list of objects with files properties

### listDeepSync(path, [iteratee], [options])

The same as `listDeep`, but synchronously;

### tree(path, [iteratee], [options], [callback])

Returns an array of objects with files properties by running recursively each file/directory in given `path` thru `iteratee`. Children files and directories are inclueded in the property `children` as the next list (Array). The iteratee is invoked with one argument: (stats) - a fs.Stats object provides information about a file (from build-in node.js module ["fs"](https://nodejs.org/api/fs.html#fs_class_fs_stats));

#### Arguments

* `path` - (string) Start directory to list files from
* `[iteratee]` - (Function) The function invoked per iteration
* `[options]` - (Object) The options object:
* `[options.properties]` - (Array) The list of file's properties to return. By default it icludes "name", "fullName", "path", "fullPath", "ext", "size", "mtime", "isDirectory"
* `[options.ignore]` - (Array) The list of files/directories to skip. By default it skips directories ".git", ".vscode", ".gitignore", ".npmignore", "node_modules"
* `[options.onlyFolders]` - (boolen) If it is `true` only folders/directories will be included in list. By default it is `false`
* `[options.withSysRoot]` - (boolen) Specifies, weather the full path to the file has to include system root to the given `path`. By default it is `false`, so the full path starts from given `path`
* `[options.levels]` - (number) Specifies, how deep to list directories. By default t is `undefined`, so the method returns all child files/directories
* `[options.childrenAlias]` - (string) Specifies the name of the property, which will include child files. By default it is `children`
* `[callback]` - (Function) The callback function, returning two arguments: (err `Error`, list `Array`). If callback is not provided, the method returns `Promiss`

#### Returns 
`Array` - the tree list of objects with files properties

### treeSync(path, [iteratee], [options])

The same as `tree`, but synchronously;


## License

[MIT](./LICENSE)