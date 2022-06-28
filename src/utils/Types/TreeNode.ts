/**
 * All `<Tree/>` components consist of TreeNodes.
 * Each TreeNode maps to a`<g/>`, and is either a
 * child, parent, or both.
 */
export interface TreeNode {
  child: string | number | boolean;
  parent: string | number | boolean;
  /**
   * Optional - Sets whether the tree node is visible.
   */
  hide?: boolean;
  /**
   * Optional - The value initializing the class attribute
   * for the <g/> created for the TreeNode.
   */
  className?: string;
}
