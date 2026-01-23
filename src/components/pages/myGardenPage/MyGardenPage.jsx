import MyGardenForm from "../../forms/myGardenForm/MyGardenForm.jsx";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import React from "react";
import {Navigate} from "react-router-dom";

function MyGardenPage(){

    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
              <section>
                <MyGardenForm/>
              </section>

            </main>


        </>
    )
}
export default MyGardenPage;