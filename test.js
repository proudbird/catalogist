const catalogist = require("./catalogist");

async function test() {

  const result1 = await catalogist.list(__dirname, { withSysRoot: true });
  const result2 = await catalogist.listDeep(__dirname, { withSysRoot: true, levels: 2 });
  const result3 = await catalogist.tree(__dirname, { withSysRoot: true, levels: 6, childrenAlias: "data" });

  console.log(result2);
}

function testSync() {

  const result4 = catalogist.listSync(__dirname, { withSysRoot: true });
  const result5 = catalogist.listDeepSync(__dirname, { withSysRoot: true, levels: 2 });
  const result6 = catalogist.treeSync(__dirname);

  console.log(result4);
}

test();
testSync();