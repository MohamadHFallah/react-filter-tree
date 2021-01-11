import React from "react";
import listToTreeSubject from "./util/listToTreeSubject";
import TreeFilter from "./component/TreeFilter";

const sampleData = [
  {
    id: "1",
    name: "child1",
    ancestor: "0",
  },
  {
    id: "2",
    name: "child2",
    ancestor: "1",
  },
  {
    id: "3",
    name: "child3",
    ancestor: "1",
  },
  {
    id: "4",
    name: "child4",
    ancestor: "2",
  },
  {
    id: "5",
    name: "child5",
    ancestor: "2",
  },
  {
    id: "5",
    name: "child5",
    ancestor: "3",
  },
  {
    id: "6",
    name: "child6",
    ancestor: "5",
  },
];

const FlatListToTree = () => {
  const [data, setData] = React.useState();

  // Mount Data
  React.useEffect(() => {
    setData(listToTreeSubject(sampleData));
  }, []);

  return <TreeFilter data={data} />;
};

export default FlatListToTree;
