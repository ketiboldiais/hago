import { max } from 'd3';

export function calculateTreeSize(_root: any, px = 25) {
  const levelWidth = [1];
  const childCount = function (level: number, n: { children: any[] }) {
    if (n.children && n.children.length > 0) {
      if (levelWidth.length <= level + 1) {
        levelWidth.push(0);
      }
      levelWidth[level + 1] += n.children.length;
      n.children.forEach(function (d: any) {
        childCount(level + 1, d);
      });
    }
  };
  childCount(0, _root);
  const newHeight = max(levelWidth) * px;
  return newHeight;
}
