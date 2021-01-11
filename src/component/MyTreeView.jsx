import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import MuiTreeItem from '@material-ui/lab/TreeItem';
import { withStyles } from '@material-ui/styles';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const MyTreeView = (props) => {
  const { data, expanded, selected, handleToggle, handleSelect } = props;

  const renderTree = (nodes) => {
    if (!nodes || nodes.length === 0) {
      return null;
    }
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default MyTreeView;

const TreeItem = withStyles({
  root: {

    '&.MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      backgroundColor: '#F5F5F5',
    },
  },
})(MuiTreeItem);

