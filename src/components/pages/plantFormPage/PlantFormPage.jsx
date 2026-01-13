import PlantForm from "../../forms/plantForm/PlantForm.jsx";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import React from "react";

function PlantFormPage(){
    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
                <PlantForm/>
            </main>


        </>
    )
}
export default PlantFormPage;