import React,{useState} from "react";
import styles from "./PlantcatalogPage.module.css";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import Button from "../../ui/button/Button.jsx";
import FormButton from "../../ui/button/Button.jsx";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";


function PlantcatalogPage(){
    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>

                <section>
                    <h1>Plant catalogus </h1>
                    <Button onClick={() => console.log("toon alle planten")}>
                        Toon alle Planten
                    </Button>
                    <form onSubmit="">
                        <FormInputField
                            label="Zoek op plantnaam: "
                            id="searchplant-field"
                            name="plantname"
                            value=""
                            onChange=""
                            type="text"
                            required
                            className=""
                        />
                        <FormButton type="submit">
                            Zoeken
                        </FormButton>
                    </form>
                    <hr/>
                    <ul>
                        <li>
                            <details>
                                <summary>
                                    <h3>Voorbeeld Plant </h3><h4>Plantus Examplus</h4>
                                </summary>

                            </details>

                        </li>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                    </ul>

                </section>

            </main>
        </>
    );
}
export default PlantcatalogPage;