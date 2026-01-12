import React from "react";
import { WarningDiamondIcon } from '@phosphor-icons/react';
import styles from './ErrorBox.module.css';

function ErrorBox({children}){



    return (

        <aside className={styles.errorBox} role="alert">
            <WarningDiamondIcon size={30} color="#cc3333" weight="bold" />
            {children}
        </aside>
    );
}

export default ErrorBox;