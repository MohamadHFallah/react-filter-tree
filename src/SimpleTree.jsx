import React from "react";
import TreeFilter from "./component/TreeFilter";

const sampleData = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
          children: [
            {
              id: "5",
              name: "Child - 5",
              children: [
                {
                  id: "6",
                  name: "Child - 6",
                },
                {
                  id: "7",
                  name: "Child - 7",
                },
                {
                  id: "8",
                  name: "Child - 8",
                },
                {
                  id: "9",
                  name: "Child - 9",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const SimpleTree = () => {
  const [data, setData] = React.useState();

  // Mount Data
  React.useEffect(() => {
    setData(sampleData);
  }, []);

  return <TreeFilter data={data} />;
};

export default SimpleTree;
