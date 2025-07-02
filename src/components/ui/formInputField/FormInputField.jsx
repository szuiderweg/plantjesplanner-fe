import React from "react";

/**
 * Generic imput component for forms including label
* onChange is a change handling function
 * - ...rest: all other props
 */
function FormInputField({
                            label,
                            id,
                            name,
                            value,
                            onChange,
                            type = "text",
                            className,
                            ...rest
                        }) {
    return (
        <label htmlFor={id}>
            {label}
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={className}
                {...rest}
            />
        </label>
    );
}

export default FormInputField;