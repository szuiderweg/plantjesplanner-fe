import PlantForm from "../../forms/plantForm/PlantForm.jsx";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import React from "react";
import {Navigate} from "react-router-dom";

function PlantFormPage({mode}){




    return(
        <>
            <header>
                <NavigationBar />
            </header>

            <main>
                <section>
                  <PlantForm mode={mode}/>
                </section>
            </main>


        </>
    )
}
export default PlantFormPage;