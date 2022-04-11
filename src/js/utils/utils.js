const getTargetParentByClassName = (node, className) => {
  if (node) {
    let current = node;
    while (current !== document.body) {
      if (current.className === className) return current;
      current = current.parentNode;
    }
    return false;
  }
};

const getTargetChild = (start = document.body, target) => {
  const queue = [start];
  const visited = {};
  visited[start] = true;

  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      const parent = queue.shift();
      for (const child of parent.childNodes) {
        if (String(child.className).includes(target)) return child;
        else {
          visited[child] = true;
          queue.push(child);
        }
      }
    }
  }
  return null;
};

const deleteNode = (query) => {
  document.querySelector(`${query}`).remove();
};

export { getTargetParentByClassName, deleteNode, getTargetChild };
