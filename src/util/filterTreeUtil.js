

// Helper functions for filtering
export const defaultMatcher = (filterText, node) => {
  return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const defaultMatcherId = (id, node) => {
  return node.id === id;
};

export const findNode = (node, filter, matcher) => {
  return (
    matcher(filter, node) || // i match
    (node.children && // or i have decendents and one of them match
      node.children.length &&
      !!node.children.find((child) => findNode(child, filter, matcher)))
  );
};

export const filterTree = (
  node,
  filter,
  matcher = defaultMatcher,
) => {
  // If im an exact match then all my children get to stay
  if (matcher(filter, node) || !node.children) {
    return node;
  }
  // If not then only keep the ones that match or have matching descendants
  const filtered = node.children
    .filter((child) => findNode(child, filter, matcher))
    .map((child) => filterTree(child, filter, matcher));
  return Object.assign({}, node, { children: filtered });
};

export const filterTreeId = (
  node,
  id,
  matcher = defaultMatcherId,
) => {
  if (node.id === id) {
    return node;
  }
  // If not then only keep the ones that match or have matching descendants
  const filtered = node.children
    .filter((child) => findNode(child, id, matcher))
    .map((child) => filterTreeId(child, id, matcher));
  return Object.assign({}, node, { children: filtered });
};

export const expandFilteredNodes = (
  node,
  filter,
  matcher = defaultMatcher,
) => {
  let children = node.children;
  if (!children || children.length === 0) {
    return Object.assign({}, node, { toggled: false });
  }
  const childrenWithMatches = node.children.filter((child) =>
    findNode(child, filter, matcher),
  );
  const shouldExpand = childrenWithMatches.length > 0;
  // If im going to expand, go through all the matches and see if thier children need to expand
  if (shouldExpand) {
    children = childrenWithMatches.map((child) => {
      return expandFilteredNodes(child, filter, matcher);
    });
  }
  return Object.assign({}, node, {
    children: children,
    toggled: shouldExpand,
  });
};

let store = [];
export const getIDsExpandFilter = (node) => {
  let children = node.children;
  if (!children || children.length === 0) {
    return store;
  }
  if (node.id === 'root') {
    store = ['root'];
  }
  if (children) {
    children.map((child) => store.push(child.id));
  }
  node.children.map((child) => getIDsExpandFilter(child));
  return store;
};

/**
 * Find tree item with recursive approach
 * @param node
 * @param id
 */
export const searchTree = (node, id) => {
  if (node.id === id) {
    return node;
  } else if (node.children != null) {
    let index;
    let result;
    for (index = 0; result == null && index < node.children.length; index++) {
      result = searchTree(node.children[index], id);
    }
    return result;
  }
  return null;
};
