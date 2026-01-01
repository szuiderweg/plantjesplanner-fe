import React, {useState} from "react";
import FormButton from "../../ui/button/Button.jsx";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import styles from "./LoginForm.module.css"
import axios from "axios";
import { useNavigate} from "react-router-dom";

function LoginForm({onLogin}) {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    //use state for error handling
    const [error, setError] = useState("");

    //use React Router
    const navigate = useNavigate();

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

        try {
            const response = await axios.post("http://localhost:8080/login", credentials);
            const jwt = response.data;

            localStorage.setItem("jwt",jwt);
            onLogin(jwt);
            navigate("/overview");
        } catch (err) {
            setError("Inloggen mislukt. probeer het nog eens")
        }
    };

    return (
       <>
            <h2 className={styles.loginPageFormTitle}>Inloggen</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && <ErrorBox>{error}</ErrorBox>}
            <FormInputField
                label="Inlognaam:"
                id="username-field"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                type="text"
                required
                className={styles.loginForm}
            />
            <FormInputField
                label="Wachtwoord:"
                id="password-field"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                type="password"
                required
                className={styles.loginForm}
            />
            <FormButton type="submit">
                Inloggen
            </FormButton>


        </form>
       </>
    );
}

export default LoginForm;