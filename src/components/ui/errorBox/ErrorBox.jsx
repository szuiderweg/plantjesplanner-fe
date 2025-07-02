import React from "react";
import { WarningDiamondIcon } from '@phosphor-icons/react';

function ErrorBox({children, className}) {
    return (
        <aside className={className} role="alert">
            <WarningDiamondIcon size={50} color="#cc3333" weight="bold" />
            {children}
        </aside>
    );
}

export default ErrorBox;