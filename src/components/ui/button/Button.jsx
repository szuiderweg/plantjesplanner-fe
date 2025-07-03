import React from "react";
import styles from './Button.module.css'

function Button({type, children, className, ...rest}) {
    return (
        <button type={type} className={styles.greenButton} {...rest}>
            {children}
        </button>
    );
}

export default Button;