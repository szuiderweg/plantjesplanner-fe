import React, {useEffect, useState} from "react";
import styles from "./OverviewPage.module.css";
import MyGardenForm from "../../forms/myGardenForm/MyGardenForm.jsx";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import axios from "axios";





function OverviewPage(){
    //this page is always loaded after successful login, so this is logical location for an API call to obtain user info and store it in local Storage for later use
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>


                <section>
                    <h2> Welkom! </h2>


                </section>


            </main>
        </>
    );
}
export default OverviewPage;