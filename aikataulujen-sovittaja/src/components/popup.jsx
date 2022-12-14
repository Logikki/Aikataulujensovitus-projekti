import React from "react";

const Popup = (props) => {
  return (
    <div className="box" clickable="false">
      <div className="popup-box">
        <button
          id="popup-close"
          className="btn-close btn btn-secondary"
          onClick={props.handleClose}
        ></button>
        {props.content}
        <button
          className="btn btn-secondary"
          style={{
            right: "15px",
            position: "absolute",
            bottom: "15px",
            width: "130px",
          }}
          type="button"
          onClick={props.rightClick}
        >
          {props.right}
        </button>
        <button
          className="btn btn-secondary"
          style={{
            left: "15px",
            position: "absolute",
            bottom: "15px",
            width: "130px",
          }}
          type="button"
          onClick={props.leftClick}
        >
          {props.left}
        </button>
      </div>
    </div>
  );
};
export default Popup;
