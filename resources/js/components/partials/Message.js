import React from 'react'
import {Alert} from "react-bootstrap";

const Message = (props) => {

    const getStyle = (props) => {
        let baseClass = "alert ";
        if (props.message.msgError)
            baseClass = baseClass + "alert-warning";
        else
            baseClass = baseClass + "alert-primary";
        return baseClass + " text-center";
    }

    return (
        <Alert variant={getStyle(props)}>
            <span dangerouslySetInnerHTML={{ __html: props.message.msgBody}}/>
        </Alert>
    )
}

export default Message;
