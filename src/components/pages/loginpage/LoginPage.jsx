import React, {useState} from "react";
import axios from "axios";
import styles from './LoginPage.module.css';
import logo from '../../../assets/logo.svg';
import LoginForm from "../../forms/loginForm/LoginForm.jsx";
import NewAccountForm from "../../forms/newAccountForm/NewAccountForm.jsx";
import Button from "../../ui/button/Button.jsx";

function LoginPage() {
    //use state to determine which form is active
    const[activeForm, toggleActiveForm] = useState("")

    return (
        <>
        <main>
            <span><img src={logo} alt="plantjesplanner logo" className={styles.logo}/>
            </span>

            <section>
                <ul className={styles.leafMarker}>
                    <li><p>Is jouw tuin een kale bende of heb je een leeg balkon en wil je de boel eens lekker vergroenen? </p></li>
                    <li><p>Maar heb je geen idee wat je er neer wilt zetten? </p></li>
                    <li><p>Zie je in de winkel door de bomen het bos niet meer? </p></li>
                </ul>

                <p className={styles.pExtraMargin}>Dan is er de PlantjesPlanner die je helpt een plan voor je plantjes te maken!</p>
                <p className={styles.pExtraMargin}>Log in of maak een nieuw account om aan de slag te gaan.</p>


                <div className={styles.loginPageButtonRow}>
                    <Button onClick={() => toggleActiveForm("login")}
                        >
                        Inloggen
                    </Button>
                    <Button onClick={() => toggleActiveForm("register")}
                    >
                        Nieuw account
                    </Button>

                </div>
            </section>

            {(activeForm === "login" || activeForm === "register") && (
            <section id="login-form-section">
            {activeForm ==="login" && <LoginForm />}
                {activeForm ==="register" && <NewAccountForm endpoint="http://localhost:8080/users/register"
                                                                 title="Nieuw account maken" />}
            </section>
                )}

            <section className={styles.madeBy}>
                <h3>gemaakt door Sophie Zuiderweg - Novi FSD Bootcamp </h3>
            </section>
        </main>

        </>
    );
}

export default LoginPage;