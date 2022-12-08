import React from "react";

const poistuminen = (props) => {
  return (
    <div className="box" clickable="false">
      <div className="poistuminen-box">
        <button
          className="btn btn-secondary"
          style={{
            right: "15px",
            position: "absolute",
            bottom: "15px",
            width: "120px",
          }}
          type="button"
          onClick={props.rightClick}
        >
          {props.right}
        </button>
        <button
          className="btn btn-secondary"
          style={{
            right: "145px",
            position: "absolute",
            bottom: "15px",
            width: "120px",
          }}
          type="button"
          onClick={props.leftClick}
        >
          {props.left}
        </button>
        {props.content}
      </div>
    </div>
  );
};
export default poistuminen;
