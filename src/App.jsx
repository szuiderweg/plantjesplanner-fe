import './App.css'
import MyGardenPage from "./components/pages/myGardenPage/MyGardenPage.jsx"
import LoginPage from "./components/pages/loginpage/LoginPage.jsx";
import React, {useEffect, useState} from "react";
import OverviewPage from "./components/pages/overviewpage/OverviewPage.jsx";
import PlantcatalogPage from "./components/pages/plantcatalogPage/PlantcatalogPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import PlantFormPage from "./components/pages/plantFormPage/PlantFormPage.jsx";
import UserManagementPage from "./components/pages/userManagementPage/UserManagementPage.jsx";
import axios from "axios";


function App() {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [loadingUser, setLoadingUser] = useState(false);

    //login function
    function handleLogin(newJwt, newRole) {
        localStorage.setItem("jwt", newJwt);
        localStorage.setItem("role", newRole);

        setJwt(newJwt);
        setRole(newRole);
    }

    //If JWT is already stored in localStorage, get user info from backend
    useEffect(() =>{
        if (!jwt) return;

        //only do request if the role is still unknown
        if(role) return;

        setLoadingUser(true);
        async function fetchUser(){
        try {
            const response = await axios.get(
                "http://localhost:8080/users/me",
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            //store info from response
            const roleFromBackend = response.data.role;
            const usernameFromBackend = response.data.username;
            //update State
            setRole(roleFromBackend);
            setUsername(usernameFromBackend);
            //update local storage
            localStorage.setItem("role", roleFromBackend);
            localStorage.setItem("username", usernameFromBackend);

        } catch (err) {
            console.error("User ophalen mislukt", err); // if request fails, remove credentials and log out.
            setJwt(null);
            setRole(null);
            setUsername(null);
            localStorage.removeItem("jwt");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
        } finally {
            setLoadingUser(false);
        }
    }
    fetchUser();
}, [jwt, role]);

    //render placeholder until role is known
    if(jwt && !role){
        return <p>Laden...</p>;
    }

    return (
//routing configuration
        <Routes>
            <Route
                path="/"
                element={<LoginPage onLogin={handleLogin}/>} />
            <Route
                path="/usermanagement"
                element={jwt && role==="ADMIN" ? <UserManagementPage/> :<Navigate to="/"/>}/>
            <Route
                path="/overview"
                element={jwt? <OverviewPage/> :<Navigate to="/" />} />
            <Route
                path="/my-garden"
                element={jwt && role==="DESIGNER" ? <MyGardenPage/> : <Navigate to="/"/>} />
            <Route
                path = "/catalog"
                element={jwt? <PlantcatalogPage/> :<Navigate to="/"/>}/>
            <Route
                path = "/plants/new"
                element={jwt && role === "ADMIN"
                    ? <PlantFormPage mode = "create"/> : <Navigate to="/catalog" /> } />
            <Route
                path = "/plants/:id/edit"
                element={jwt && role === "ADMIN" ? <PlantFormPage mode = "edit"/> : <Navigate to="/catalog" /> } />
        </Routes>
    );
}
export default App;

