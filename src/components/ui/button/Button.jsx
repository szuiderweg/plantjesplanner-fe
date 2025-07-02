import React from "react";

function Button({type, children, className, ...rest}) {
    return (
        <button type={type} className={className} {...rest}>
            {children}
        </button>
    );
}

export default Button;