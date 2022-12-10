import React from "react";

const seloste = (props) => {
  const buttonWidth = 120;
  const right = 15;

  return (
    <div className="box" clickable="false">
      <div className="seloste-box">
        <button
          className="btn btn-secondary"
          style={{
            right: right,
            position: "absolute",
            top: "30px",
            width: buttonWidth,
          }}
          type="button"
          onClick={props.rightClick}
        >
          {props.right}
        </button>
        <button
          className="btn btn-secondary"
          style={{
            right: buttonWidth + right + 10,
            position: "absolute",
            top: "30px",
            width: buttonWidth,
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
export default seloste;
