import React from "react";

const Alert =({type = "danger", messages=[]}) => {
    console.debug("Alert", "type=", type, "messages=", messages);

    return (
        <div className={`alert alert-${type}`} role='alert'>
            { messages.length > 0 && messages.map(error => (
                <p className="mb-0 small" key={error}>
                    {error}
                </p>
            ))}
        </div>
    );

}

export default Alert;