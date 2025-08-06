import './App.css'
import MyGardenForm from './components/MyGardenForm.jsx';
import LoginPage from "./components/pages/loginpage/LoginPage.jsx";
import React, {useState} from "react";
import OverviewPage from "./components/pages/overviewpage/OverviewPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";

function App() {
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

    return (
//routing configuration
        <Routes>
            <Route path="/" element={<LoginPage onLogin={setJwt}/>} />
            <Route path="/overview"  element={jwt? <OverviewPage/> :<Navigate to="/" />} />
        </Routes>
    );
}
export default App;

