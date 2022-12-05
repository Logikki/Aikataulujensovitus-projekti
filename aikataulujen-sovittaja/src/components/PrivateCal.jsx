import React from "react";

const PrivateCal = (props) => {
  return (
    <div>
      <button
        className="btn-close btn-close-white"
        onClick={() => props.handleDelete(props.cal.id)}
      ></button>
      <label>{props.cal.name}</label>
    </div>
  );
};

export default PrivateCal;
