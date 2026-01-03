import React from "react";
import styles from "./FormSelect.module.css";

function FormSelect({ label, id, name, value, onChange, options, required = false}){
    return(
        <label htmlFor={id} >
            {label}
            <select
                id = {id}
                name = {name}
                value = {value ?? ""}
                onChange = {onChange}
                required = {required}
                className = {styles.select}
            >
            <option value="" disabled> -- selecteer -- </option>
                {options.map(option =>(
                    <option key={option} value={option}>
                        {option.toLowerCase()}
                    </option>
                ))}
            </select>

        </label>
    );
}

export default FormSelect;