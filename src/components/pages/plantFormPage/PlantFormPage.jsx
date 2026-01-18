import PlantForm from "../../forms/plantForm/PlantForm.jsx";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import React from "react";

function PlantFormPage(){
    return(
        <>
            <header>
                <NavigationBar />
            </header>

            <main>
                <section>
                  <PlantForm/>
                </section>
            </main>


        </>
    )
}
export default PlantFormPage;