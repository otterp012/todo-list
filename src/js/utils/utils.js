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

function deleteNode(query) {
  document.querySelector(`${query}`).remove();
}

export { getTargetParentByClassName, deleteNode };
