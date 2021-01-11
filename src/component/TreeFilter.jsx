import React from "react";
import TextField from "@material-ui/core/TextField";
import { uniq } from "lodash";
import MyTreeView from "./MyTreeView";
import { filterTree, expandFilteredNodes, getIDsExpandFilter } from "../util/filterTreeUtil";

const TreeFilter = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = React.useState(["root"]);
  const [selected, setSelected] = React.useState([]);
  const [subjectData, setSubjectData] = React.useState();
  const [selectedSingleItem, setSelectedSingleItem] = React.useState("");

  React.useEffect(() => {
    setSubjectData(() => data);
  }, [data]);

  const onFilterMouseUp = (e) => {
    const value = e.target.value;
    const filter = value.trim();
    let expandedTemp = expanded;
    if (!filter) {
      setSubjectData(() => data);
      setExpanded(['root']);
      return;
    }

    let filtered = filterTree(data, filter);
    filtered = expandFilteredNodes(filtered, filter);
    if (filtered && filtered.children) {
      // filtered.children.map((item) => {
      //   expandedTemp.push(item.id);
      // });
      expandedTemp = [];
      expandedTemp.push(...getIDsExpandFilter(filtered));
    }
    setExpanded(uniq(expandedTemp));
    setSubjectData(filtered);
  };

  const handleToggle = (event, nodeIds) => {
    let expandedTemp = expanded;
    expandedTemp = nodeIds;
    setExpanded(expandedTemp);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    // When false (default) is a string this takes single string.
    if (!Array.isArray(nodeIds)) {
      setSelectedSingleItem(nodeIds);
    }
    // TODO: When `multiSelect` is true this takes an array of strings
  };

  return (
    <div>
      <TextField label="Filter ..." onKeyUp={onFilterMouseUp} />
      <MyTreeView
        data={subjectData}
        expanded={expanded}
        selected={selected}
        handleToggle={handleToggle}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default TreeFilter;
