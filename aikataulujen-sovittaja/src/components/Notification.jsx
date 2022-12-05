import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return (
        <div className="error">
            {message}
        </div>
    );
};

export default Notification;