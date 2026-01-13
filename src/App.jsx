import './App.css'
import MyGardenPage from "./components/pages/myGardenPage/MyGardenPage.jsx"
import LoginPage from "./components/pages/loginpage/LoginPage.jsx";
import React, {useState} from "react";
import OverviewPage from "./components/pages/overviewpage/OverviewPage.jsx";
import PlantcatalogPage from "./components/pages/plantcatalogPage/PlantcatalogPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import PlantFormPage from "./components/pages/plantFormPage/PlantFormPage.jsx";

function App() {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

    return (
//routing configuration
        <Routes>
            <Route path="/" element={<LoginPage onLogin={setJwt}/>} />
            <Route path="/overview"  element={jwt? <OverviewPage/> :<Navigate to="/" />} />
            <Route path="/my-garden" element={jwt? <MyGardenPage/> : <Navigate to="/overview"/>} />
            <Route path = "/catalog" element={jwt? <PlantcatalogPage/> :<Navigate to="/overview"/>}/>
            <Route path = "/plants/new" element={jwt ? <PlantFormPage mode = "create"/> : <Navigate to="/catalog" /> } />
            <Route path = "/plants/:id/edit" element={jwt ? <PlantFormPage mode = "edit"/> : <Navigate to="/catalog" /> } />
        </Routes>
    );
}
export default App;

