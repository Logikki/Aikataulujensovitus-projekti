import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return (
        <Alert key={"danger"} variant={"danger"}>
            <p>
                {message}
            </p>
        </Alert>
    );
};

export default Notification;
