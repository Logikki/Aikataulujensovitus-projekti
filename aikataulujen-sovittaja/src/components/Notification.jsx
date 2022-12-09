import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <Alert className="error-message" key={"danger"} variant={"danger"}>
      <p>{message}</p>
    </Alert>
  );
};

export default Notification;
