import React, {useState} from "react";
import FormButton from "../../ui/button/Button.jsx";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import styles from "./NewAccountForm.module.css"
import axios from "axios";

function NewAccountForm({onRegistration}) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        repeatPassword:""
    });
    //use state for error handling
    const [error, setError] = useState("");

    function handleChange(e) {
        const {name, value} = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if(credentials.password!== credentials.repeatPassword){
            setError("Wachtwoorden komen niet overeen");
            return
        }

        try {
            const response = await axios.post("http://localhost:8080/users/register", credentials);
            const jwt = response.data;
            onRegistration();
        } catch (err) {
            setError("Inloggen mislukt. probeer het nog eens")
        }
    };

    return (
        <>
            <h2 className={styles.newAccountFormTitle}>Nieuw account maken</h2>
        <form onSubmit={handleSubmit} className={styles.newAccountForm}
        >
            {error && <ErrorBox>{error}</ErrorBox>}
            <FormInputField
                label="Inlognaam:"
                id="username-field"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                type="text"
                required
                className={styles.newAccountForm}
            />
            <FormInputField
                label="Wachtwoord:"
                id="password-field"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                type="password"
                required
                className={styles.newAccountForm}
            />
            <FormInputField
                label="Herhaal wachtwoord:"
                id="password2-field"
                name="repeatPassword"
                value={credentials.repeatPassword}
                onChange={handleChange}
                type="password"
                required
                className={styles.newAccountForm}
            />
            <FormButton type="submit">
                Aanmaken
            </FormButton>


        </form>
        </>
    );
}
export default NewAccountForm;