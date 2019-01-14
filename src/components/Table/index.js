import React from "react";
import { Button } from "../Button";
import PropTypes from "prop-types";
import Sort from "../Sort";

// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
  width: "40%"
};
const midColumn = {
  width: "30%"
};
const midSmallColumn = {
  width: "15%"
};
const smallColumn = {
  width: "10%"
};

//// TABLE COMPONENT ////

const Table = ({ list, onDismiss, onSort, activeSortKey }) => (
  <div className="table">
    <div className="table-header">
      <span style={largeColumn}>
        <Sort
          sortKey={"TITLE"}
          onSort={() => onSort("TITLE")}
          activeSortKey={activeSortKey}
        >
          Title
        </Sort>
      </span>
      <span style={midColumn}>
        <Sort
          sortKey={"AUTHOR"}
          onSort={() => onSort("AUTHOR")}
          activeSortKey={activeSortKey}
        >
          Author
        </Sort>
      </span>
      <span style={midSmallColumn}>
        <Sort
          sortKey={"COMMENTS"}
          onSort={() => onSort("COMMENTS")}
          activeSortKey={activeSortKey}
        >
          Comments
        </Sort>
      </span>
      <span style={smallColumn}>
        <Sort
          sortKey={"POINTS"}
          onSort={() => onSort("POINTS")}
          activeSortKey={activeSortKey}
        >
          Points
        </Sort>
      </span>
      <span style={smallColumn}>Archive</span>
    </div>

    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={midSmallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={smallColumn}>
          <Button
            className="button-inline"
            onClick={() => onDismiss(item.objectID)}
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;
