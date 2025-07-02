import React, {useState} from "react";
import axios from "axios";
import styles from './LoginPage.module.css'
import logo from '../../../assets/logo.svg';
import LoginForm from "../../forms/loginForm/LoginForm.jsx";

function LoginPage({onLogin}) {
    //use state for the form
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
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

        try {
            const response = await axios.post("http://localhost:8080/login", credentials);
            const jwt = response.data;
            onLogin(jwt);
        } catch (err) {
            setError("Inloggen mislukt. probeer het nog eens")
        }
    };

    return (
        <main>
            <span><img src={logo} alt="plantjesplanner logo" id={styles['logo']}/></span>

            <section id="login-form-section">
                <h2 className={styles['login-form-title']}>Inloggen</h2>
               <LoginForm
                   credentials={credentials}
                   onChange={handleChange}
                   onSubmit={handleSubmit}
                   error={error}
                   styles={styles}
                   />

            </section>
        </main>
    );
}

export default LoginPage;