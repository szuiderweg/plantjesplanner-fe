import './App.css'
import MyGardenPage from "./components/pages/myGardenPage/MyGardenPage.jsx"
import LoginPage from "./components/pages/loginpage/LoginPage.jsx";
import React, {useState} from "react";
import OverviewPage from "./components/pages/overviewpage/OverviewPage.jsx";
import PlantcatalogPage from "./components/pages/plantcatalogPage/PlantcatalogPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import PlantFormPage from "./components/pages/plantFormPage/PlantFormPage.jsx";
import UserManagementPage from "./components/pages/userManagementPage/UserManagementPage.jsx";


function App() {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    //login
    function handleLogin(jwt, role) {
        setJwt(jwt);
        setRole(role);
    }

    // //logout
    // function handleLogout() {
    //     //clear credentials from localstorage
    //     localStorage.removeItem("jwt");
    //     localStorage.removeItem("role");
    //     localStorage.removeItem("username");
    //
    //     //clear State
    //     setJwt(null);
    //     setRole(null);
    // }


    return (
//routing configuration
        <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin}/>} />
            <Route path="/usermanagement" element={localStorage.getItem("jwt") && localStorage.getItem("role") === "ADMIN" ? <UserManagementPage/> :<Navigate to="/"/>}/>
            <Route path="/overview"  element={jwt? <OverviewPage/> :<Navigate to="/" />} />
            <Route path="/my-garden" element={jwt? <MyGardenPage/> : <Navigate to="/overview"/>} />
            <Route path = "/catalog" element={jwt? <PlantcatalogPage/> :<Navigate to="/overview"/>}/>
            <Route path = "/plants/new" element={jwt ? <PlantFormPage mode = "create"/> : <Navigate to="/catalog" /> } />
            <Route path = "/plants/:id/edit" element={jwt ? <PlantFormPage mode = "edit"/> : <Navigate to="/catalog" /> } />
        </Routes>
    );
}
export default App;

