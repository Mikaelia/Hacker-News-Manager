import React from "react";
import Button from "../Button";
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
const smallColumn = {
  width: "10%"
};

//// TABLE COMPONENT ////

const Table = ({ list, onDismiss, onSort, activeSortKey }) => (
  <div className="table">
    <div className="table-header">
      <span style={{ width: "40%" }}>
        <Sort
          sortKey={"TITLE"}
          onSort={() => onSort("TITLE")}
          activeSortKey={activeSortKey}
        >
          Title
        </Sort>
      </span>
      <span style={{ width: "30%" }}>
        <Sort
          sortKey={"AUTHOR"}
          onSort={() => onSort("AUTHOR")}
          activeSortKey={activeSortKey}
        >
          Author
        </Sort>
      </span>
      <span style={{ width: "10%" }}>
        <Sort
          sortKey={"COMMENTS"}
          onSort={() => onSort("COMMENTS")}
          activeSortKey={activeSortKey}
        >
          Comments
        </Sort>
      </span>
      <span style={{ width: "10%" }}>
        <Sort
          sortKey={"POINTS"}
          onSort={() => onSort("POINTS")}
          activeSortKey={activeSortKey}
        >
          Points
        </Sort>
      </span>
      <span style={{ width: "10%" }}>Archive</span>
    </div>

    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
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
