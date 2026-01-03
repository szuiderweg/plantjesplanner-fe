import React from "react";
import styles from "./FormCheckbox.module.css";

function FormCheckbox({ label, id, name, checked, onChange}){
    return(
      <label htmlFor={id} className={styles.checkboxLabel}>
          <input
              type="checkbox"
              id = {id}
              name = {name}
              checked = {checked}
              onChange={onChange}
          />
          {label}
      </label>
    );
}

export default FormCheckbox;