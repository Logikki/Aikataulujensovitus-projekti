import React from "react";

const Popup = (props) => {
  return (
    <div className="popup-box" clickable="false">
      <div className="box">
        <button
          id="popup-close"
          className="btn-close btn btn-secondary"
          onClick={props.handleClose}
        ></button>
        {props.content}
      </div>
    </div>
  );
};
export default Popup;
