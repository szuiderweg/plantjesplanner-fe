import './App.css'
import MyGardenForm from './components/MyGardenForm.jsx';
import LoginPage from "./components/pages/loginpage/LoginPage.jsx";
import React, {useState} from "react";
import OverviewPage from "./components/pages/overviewpage/OverviewPage.jsx";
import PlantcatalogPage from "./components/pages/PlantcatalogPage/PlantcatalogPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import PlantFormPage from "./components/pages/PlantFormPage/PlantFormPage.jsx";

function App() {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

    return (
//routing configuration
        <Routes>
            <Route path="/" element={<LoginPage onLogin={setJwt}/>} />
            <Route path="/overview"  element={jwt? <OverviewPage/> :<Navigate to="/" />} />
            <Route path = "/catalog" element={jwt? <PlantcatalogPage/> :<Navigate to="/" /> } />
            <Route path = "/plants/new" element={jwt ? <PlantFormPage mode = "create"/> : <Navigate to="/" /> } />
            <Route path = "/plants/:id/edit" element={jwt ? <PlantFormPage mode = "edit"/> : <Navigate to="/" /> } />
        </Routes>
    );
}
export default App;

