import { TreeNode } from '../utils';
import { AST } from './ParseTree';

class QueueNode {
  value: any;
  next: any;
  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  first: any;
  last: any;
  size: number;
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  isNotEmpty() {
    return this.size !== 0;
  }
  enqueue(value) {
    const newNode = new QueueNode(value);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
  }
  dequeue() {
    if (this.size === 0) return false;
    const dequeuedNode = this.first;
    const newFirst = this.first.next;
    if (!newFirst) this.last = newFirst;
    this.first = newFirst;
    dequeuedNode.next = null;
    this.size--;
    return dequeuedNode;
  }
}

export const BuildASTNodes = (tree: AST) => {
  console.log(tree);
  let n = 2;
  const queue = new Queue();
  queue.enqueue(tree);
  let testarr: TreeNode[] = [
    {
      child: 'root',
      parent: '',
      hide: true,
      id: 'root',
      type: 'root',
      className: 'AST_node',
    },
  ];
  let node: TreeNode;
  let p: number;

  while (queue.isNotEmpty()) {
    let root = queue.dequeue();
    if (root.value.v) {
      let type = tree.t ? tree.t : 'token';
      p = n & 1 ? (n - 1) >> 1 : (n >> 1) - 1;
      let pid = root.value.pid ? root.value.pid : testarr[p].child;
      let id = root.value.id ? root.value.id : root.value.v;
      node = {
        child: root.value.v,
        parent: testarr[p].child,
        pid,
        id,
        hide: root.value.hide ? root.value.hide : false,
        type,
        className: 'AST_node',
      };
      testarr.push(node);
      n++;
    }
    if (root.value.l) queue.enqueue(root.value.l);
    if (root.value.r) queue.enqueue(root.value.r);
  }
  console.log(testarr);
  return testarr;
};
