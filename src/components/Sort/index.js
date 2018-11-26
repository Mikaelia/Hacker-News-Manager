import React from "react";
import classNames from "classnames";
import Button from "../Button";

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
  const sortClass = classNames("button-inline", {
    "button-active": sortKey === activeSortKey
  });

  return (
    <Button onClick={onSort} className={sortClass}>
      {children}
    </Button>
  );
};

export default Sort;
