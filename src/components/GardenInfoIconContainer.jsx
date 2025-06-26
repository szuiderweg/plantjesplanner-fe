import React from "react";

export default function GardenInfoIconContainer({label, value, icon}){
    return (
        <div>
            <p>{icon}</p>
            <p>{value} {label}</p>
        </div>
    );
}