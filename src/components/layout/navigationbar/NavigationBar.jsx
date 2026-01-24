import React from "react";
import {  NavLink, useNavigate } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import {House, SignOut} from "phosphor-react";
import Button from "../../ui/button/Button.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

function NavigationBar(){

    const navigate = useNavigate();
    const { user, username, role, logout } = useAuth();


    //log out by deleting credentials and jwt from local storage. the Routing defined below will automatically redirect to login page when there is no jwt present
    function handleLogout() {
        logout();
        navigate("/");
    }



    return(
        <>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        {/*Overview page "Start" -- all roles */}
                        <NavLink
                        className={({ isActive}) => isActive ? 'active-menu-link':'default-menu-link'}
                        to = "/overview">
                        <House size={32} color="#3b4d3c" weight="fill" />
                        Start
                        </NavLink>
                    </li>

                    {/*Plant catalog page " Planten catalogus -- all roles"*/}

                    <li className={styles.navItem}>
                        <NavLink
                            className={({ isActive}) => isActive ? 'active-menu-link':'default-menu-link'}
                            to = "/catalog">
                            Planten catalogus
                        </NavLink>
                    </li>

                    {/* MyGarden page "Mijn tuin" -- DESIGNER only*/}
                    {role?.toUpperCase() === "DESIGNER" && (
                    <li className={styles.navItem}>
                        <NavLink
                        className={({ isActive}) => isActive ? 'active-menu-link':'default-menu-link'}
                        to = "/my-garden">
                        Mijn tuin
                        </NavLink>
                    </li>
                    )}

                    {/* Usermanagement page "Accounts beheren" -- ADMIN only*/}
                    { role?.toUpperCase() === "ADMIN" && (
                        <li className={styles.navItem}>
                        <NavLink
                        className={({ isActive}) => isActive ? 'active-menu-link':'default-menu-link'}
                        to = "/usermanagement">
                        Accounts beheren
                    </NavLink>
                    </li>
                    )}

                    <li className={styles.navItem}>
                        <span>{username}</span>
                    </li>


                    <li  className={styles.navItem}>

                    <Button
                        type="button"
                        onClick={handleLogout}
                    >
                        <SignOut size={32} color="#eef3eb" weight="fill" /> Uitloggen
                    </Button>
                    </li>



                </ul>
            </nav>
        </>
    );
}
export default NavigationBar;