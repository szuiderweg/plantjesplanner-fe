import MyGardenForm from "../../forms/myGardenForm/MyGardenForm.jsx";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import React from "react";

function MyGardenPage(){
    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
              <section>
               <h1> Mijn tuin</h1>
                <MyGardenForm/>
              </section>

            </main>


        </>
    )
}
export default MyGardenPage;