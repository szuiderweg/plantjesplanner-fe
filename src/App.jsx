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
import {useAuth} from "./context/AuthContext.jsx";

function App() {
    const {isAuthenticated, role} = useAuth();

    return (
//routing configuration
        <Routes>
            <Route
                path="/"
                element={<LoginPage/>} />
            <Route
                path="/usermanagement"
                element={isAuthenticated && role==="ADMIN" ? <UserManagementPage/> :<Navigate to="/"/>}/>
            <Route
                path="/overview"
                element={isAuthenticated ? <OverviewPage/> :<Navigate to="/" />} />
            <Route
                path="/my-garden"
                element={isAuthenticated && role==="DESIGNER" ? <MyGardenPage/> : <Navigate to="/"/>} />
            <Route
                path = "/catalog"
                element={isAuthenticated ? <PlantcatalogPage/> :<Navigate to="/"/>}/>
            <Route
                path = "/plants/new"
                element={isAuthenticated && role === "ADMIN"
                    ? <PlantFormPage mode = "create"/> : <Navigate to="/catalog" /> } />
            <Route
                path = "/plants/:id/edit"
                element={isAuthenticated && role === "ADMIN" ? <PlantFormPage mode = "edit"/> : <Navigate to="/catalog" /> } />
        </Routes>
    );
}
export default App;

