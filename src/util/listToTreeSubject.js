// https://stackoverflow.com/a/18018037/4931922
let mapIds = [];
const listToTreeSubject = (data) => {
  let node;
  let counter;
  const roots = [];
  mapIds = [];
  data.map((item, index) => {
    mapIds[item.id] = index; // initialize the map
    item.children = [];
  });
  for (counter = 0; counter < data.length; counter += 1) {
    node = data[counter];
    if (node.ancestor !== "0") {
      data[mapIds[node.ancestor]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return {
    id: "root",
    name: "Parent",
    children: roots,
  };
};

export default listToTreeSubject;
