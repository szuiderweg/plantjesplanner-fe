import React, {useEffect, useState} from "react";
import styles from "./OverviewPage.module.css";
import MyGardenForm from "../../forms/myGardenForm/MyGardenForm.jsx";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import axios from "axios";





function OverviewPage(){
    //this page is always loaded after successful login, so this is logical location for an API call to obtain user info and store it in local Storage for later use
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [username, setUsername] = useState(localStorage.getItem("username"));


    useEffect(() => {
        async function fetchUser() {
            if (!jwt) return;

            try {
                const response = await axios.get(
                    "http://localhost:8080/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
                //store info from response
                const roleFromBackend = response.data.role;
                const usernameFromBackend = response.data.username;
                //update State
                setRole(roleFromBackend);
                setUsername(usernameFromBackend);
                //update local storage
                localStorage.setItem("role", roleFromBackend);
                localStorage.setItem("username", usernameFromBackend);

            } catch (e) {
                console.error("User ophalen mislukt");
            }
        }

        fetchUser();
    }, [jwt]);






    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
                {/*<section>  /!*MY GARDEN FORM*!/*/}
                {/*    <h1>Mijn tuin</h1>*/}
                {/*    <p> dit formulier is verplaatst</p>*/}
                {/*    <MyGardenForm/>*/}
                {/*    <a href="">naar overzicht </a>*/}
                {/*    <a href="">volgende: plantenkiezer</a>*/}
                {/*</section>*/}

                {/*<section>*/}
                {/*    <h2>Mijn tuin resultaat</h2>*/}
                {/*    <p>mooie icoontjes mijn tuin info</p>*/}
                {/*    <article>*/}
                {/*        <p>toon de waarden uit het formulier met icoontje dat hoort bij de waarde, indien niet leeg</p>*/}
                {/*        <p>garden name</p>*/}
                {/*        <div>sun-icon, sun-value</div>*/}
                {/*        <div>moist-icon, moisture-value</div>*/}
                {/*        <div>wind-icon, wind-value</div>*/}
                {/*        <div>plek-icon, radiobutton</div>*/}
                {/*        <div>meetlat-icon (fixed), aantal plantjes of m2</div>*/}
                {/*    </article>*/}
                {/*    <a href=""> mijn tuin bewerken</a>*/}
                {/*</section>*/}

                <section>
                    <h2>Plant formulier voor beheerders</h2>
                    <h3>plant properties</h3>
                    <p>naam (tekst)</p>
                    <p>latijnse naam (tekst)</p>
                    <p>omschrijving (tekst) </p>
                    <p>height en footprint (numbers) </p>
                    <p>bloomcolorgroup en bloomcolorhex (tekst en colorpicker)</p>
                    <h3>locale properties</h3>
                    <p>: zonlicht , vochtigheid, windtolerantie,(dropdown x3)  geschikt voor pot (checkbox) </p>
                    <h3>bloomingmonths </h3>
                    <p>een checkboxje voor elke maand naast elkaar 12 x checkbox</p>

                    <h3>afbeelding plantavatar uploaden</h3>
                    <p>inputtype file </p>
                    <p>afbeelding verwijderen knopje</p>
                    <button type="button">preview</button>
                    <p>publiceren checkbox</p>
                    <p>opslaan knop</p>

                    <article>
                        <h2>plant preview</h2>
                        <hr/>
                        <p> naam + latijnse naam </p>
                        <p>plaatje</p>
                        <p>locale icoontjes</p>
                        <p>afmetingen</p>
                        <p>description</p>
                        <p>bloomkalender regel</p>
                    </article>

                </section>

                <section>
                    <h2>Plant info blokje van 1 plant </h2>
                    <p>hergebruik plant preview </p>
                </section>


                <section>
                    <div>
                        <h2>Plantjeskiezer</h2>
                        <p >input type="search" zoek op naam </p>
                        <p>toon geschikte planten</p>
                    </div>
                    <ul>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                    </ul>

                </section>

                <section>
                    <h2>Plantjeskeuze</h2>
                    <ul>
                        <li><p>gekozenplant 1+ fruitbasket knopjes+ verwijderknop</p></li>
                        <li><p>gekozenplant 1+ fruitbasket knopjesverwijderknop</p></li>
                        <li><p>gekozenplant 1+ fruitbasket knopjes+ verwijderknop</p></li>
                        <li><p>gekozenplant 1+ fruitbasket knopjes+ verwijderknop</p></li>
                    </ul>

                    <p>meter element: %beplant  </p>
                    <h3>bloeikalender</h3>
                    <p>table met maandletters(kop rij) , plantnaam (kopkolom) en vakjes met bloeiicoontjes </p>
                </section>
                <section>
                    <h2>moodboardmaker</h2>
                    <p>toevoegen knop</p>
                    <p>9 tegels bij elkaar met elk: ondertitel(tekst), input file, prullenbak</p>
                </section>
                <section>
                    <h2>Ontwerp overzicht</h2>
                    <p>mijn tuin info </p>
                    <p>meter </p>
                    <p>plantkeuze tabel</p>
                    <h2>moodboard</h2>
                </section>
                <section>
                    <h2>mijn account</h2>
                    <p>eigen inlog aanpassen</p>
                </section>
                <section>
                    <h2>gebruikers beheer</h2>
                    <p>lijst met alle gebruikers</p>
                    <p>gebruikers details: inlog aanpassen, verwijderen, beheerder checkbox</p>
                    <p>dingetje om mensen admin te maken</p>
                </section>
                {/*<section>*/}
                {/*    <h2>PlantjesPlanner inlogpagina</h2>*/}
                {/*    <LoginPage/>*/}
                {/*</section>*/}
            </main>
        </>
    );
}
export default OverviewPage;