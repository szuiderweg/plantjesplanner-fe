import React from "react";
import FormButton from "../../ui/button/Button.jsx";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";

function LoginForm({credentials, onChange, onSubmit, error, styles}) {
    return (
        <form onSubmit={onSubmit} className={styles['login-form']}>
            <FormInputField
                label="Inlognaam:"
                id="username-field"
                name="username"
                value={credentials.username}
                onChange={onChange}
                type="text"
                required
                className={styles['banaan']}
            />
            <FormInputField
                label="Wachtwoord:"
                id="password-field"
                name="password"
                value={credentials.password}
                onChange={onChange}
                type="password"
                required
                className={styles['banaan']}
            />
            <FormButton type="submit" className={styles.knopje}>
                Inloggen
            </FormButton>
            {error && <ErrorBox className={styles.error}>{error}</ErrorBox>}
        </form>
    );
}

export default LoginForm;