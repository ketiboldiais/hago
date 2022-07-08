import { min } from 'd3';

const AddLevels = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    let level = data[i];
    for (let j = 0; j < level.length; j++) {
      let current = level[j];
      current.level = i;
    }
  }
  return data;
};

const Flatten = (data: any) => data.reduce((a: any, x: any) => a.concat(x), []);

export function BuildPolyTreeData(
  data: any[],
  treeWidth = 20,
  treeHeight = 50,
  groupWidth = 20,
  yAxisPadding = 50,
  offsetX = 0,
  offsetY = 0
) {
  AddLevels(data);

  // flattens the data into a single array of nodes
  let _nodes = Flatten(data);

  // add the nodes to the node index
  let _nodeIndex = {};
  for (let i = 0; i < _nodes.length; i++) {
    let current = _nodes[i];
    let currentNodeName = current.val;
    _nodeIndex[currentNodeName] = current;
  }

  for (let i = 0; i < _nodes.length; i++) {
    let current = _nodes[i];
    current.par = (current.par === undefined ? [] : current.par).map(
      (p: any) => _nodeIndex[p]
    );
  }

  let parentIndex: any = {};
  let parentArray = [];

  for (let i = 0; i < data.length; i++) {
    let currentLevel = data[i];
    for (let j = 0; j < currentLevel.length; j++) {
      let entry = currentLevel[j];
      if (entry.par.length === 0) continue;
      parentArray.push(entry.par);
    }
  }
  parentArray = parentArray.flat(1);

  for (let i = 0; i < parentArray.length; i++) {
    let currentParent = parentArray[i];
    let parentName = currentParent.val;
    if (parentName in parentIndex) continue;
    parentIndex[parentName] = currentParent;
  }

  for (let i = 0; i < data.length; i++) {
    let currentLevel = data[i];
    for (let j = 0; j < currentLevel.length; j++) {
      let entry = currentLevel[j];
      if (entry.par.length === 0) continue;
      let id = entry.par
        .map((d: any) => d.val)
        .sort()
        .join('--');
      if (id in parentIndex) parentIndex[id].par.concat(entry.par);
      entry.bundle = parentIndex[id];
    }
    currentLevel.bundles = Object.keys(parentIndex).map((k) => parentIndex[k]);
    currentLevel.bundles.forEach((b: { i: any }, i: any) => (b.i = i));
  }

  let _links = [];

  _nodes.forEach((d: { par: any[]; bundle: any }) => {
    d.par.forEach((p: any) =>
      _links.push({ source: d, bundle: d.bundle, target: p })
    );
  });

  let bundles = data.reduce((a: any, x: any) => a.concat(x.bundles), []);

  bundles.forEach((_bundle) => {
    _bundle.par.forEach((parent) => {
      if (parent.bundles_index === undefined) {
        parent.bundles_index = {};
      }
      if (!(_bundle.id in parent.bundles_index)) {
        parent.bundles_index[_bundle.id] = [];
      }
      parent.bundles_index[_bundle.id].push(_bundle);
    });
  });

  const _height = treeHeight;
  const _width = treeWidth;
  const _bundleWidth = groupWidth;
  const _yAxisPadding = yAxisPadding;
  let x_offset = offsetX;
  let y_offset = offsetY;

  data.forEach((level: any) => {
    x_offset += level.bundles.length * _bundleWidth;
    y_offset += _yAxisPadding;
    level.forEach(
      (entry: { x: number; level: number; y: number }, i: number) => {
        entry.x = entry.level * _width + x_offset + _height / 2;
        entry.y = i * _height + y_offset;
      }
    );
    y_offset += level.length * _height;
  });

  // let ordinal = 0;

  for (let i = 0; i < data.length; i++) {
    let currentLevel = data[i];
    currentLevel;
    for (let j = 0; j < currentLevel.bundles.length; j++) {
      let currentBundle = currentLevel.bundles[j];
      if (currentBundle.par.length === 0) break;
      currentBundle.x =
        currentBundle.par[0].x +
        _width +
        (currentLevel.bundles.length - 1 - currentBundle.i) * _bundleWidth;
      // currentBundle.y = ordinal * _height;
    }
    // ordinal += currentLevel.length;
  }

  _links.forEach((link) => {
    link.xt = link.target.x;
    link.yt = link.target.y;
    link.xb = link.bundle.x;
    link.yb = link.bundle.y;
    link.xs = link.source.x;
    link.ys = link.source.y;
  });

  const layout = {
    height: _nodes.length * _height * data.length * _yAxisPadding,
    nodeHeight: _height,
    nodeWidth: _width,
    bundleWidth: _bundleWidth,
  };

  return {
    data,
    nodes: _nodes,
    nodeIndex: _nodeIndex,
    links: _links,
    bundles,
    layout,
  };
}

let testData = [
  [{ val: 'a' }],
  [
    { val: 'x', par: ['a'] },
    { val: 'y', par: ['a'] },
    { val: 'z', par: ['a'] },
  ],
  [
    { val: 'n', par: ['y'] },
    { val: 'g', par: ['z'] },
  ],
];
const result = BuildPolyTreeData(testData);
result;
