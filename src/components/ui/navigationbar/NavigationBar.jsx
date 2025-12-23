import React from "react";
import { Link, NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';

function NavigationBar(){
    return(
        <>
            <nav>
                <ul>
                    <li>  <NavLink
                        className={({ isActive}) => isActive ? 'active-menu-link':'default-menu-link'}
                        to = "/overview">
                        {/*<House size={32} color="#3b4d3c" weight="fill" /> */}
                        Start
                    </NavLink></li>
                    <li><a href="/">tuin</a></li>
                    <li><a href="/">plantenkiezer</a></li>
                    <li>
                        <NavLink
                            className={({ isActive}) => isActive ? 'active-menu-link':'default-menu-link'}
                            to = "/catalog">
                                Plantjes catalogus
                        </NavLink>
                    </li>
                    <li><a href="/">moodboard</a></li>
                    <li><a href="/">accounts beheren</a></li>
                    <li><button type="button">account</button></li>
                    {/*<User size={32} color="#3b4d3c" weight="fill" />*/}
                    {/*<SignOut size={32} color="#3b4d3c" weight="fill" />*/}
                    <li><p>huidige inlognaam</p></li>
                    <li><button type="button">uitloggen</button></li>
                </ul>
            </nav>
        </>
    );
}
export default NavigationBar;