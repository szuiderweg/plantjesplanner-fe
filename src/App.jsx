import './App.css'
import MyGardenForm from './components/MyGardenForm.jsx';
import LoginPage from "./components/pages/LoginPage.jsx";
import React, {useState} from "react";

function App() {
const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

//show loginpage if localStrorage does not contain jwt (token)
if(!jwt){
    return <LoginPage onLogin={setJwt}/>;
}


    return (<>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">start</a></li>
                        <li><a href="/">tuin</a></li>
                        <li><a href="/">plantenkiezer</a></li>
                        <li><a href="/">plantencatalogus</a></li>
                        <li><a href="/">moodboard</a></li>
                        <li><a href="/">accounts beheren</a></li>
                        <li><button type="button">account</button></li>
                        <li><p>huidige inlognaam</p></li>
                        <li><button type="button">uitloggen</button></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section>  {/*MY GARDEN FORM*/}
                    <h1>Mijn tuin</h1>
                    <MyGardenForm />

                    <a href="">naar overzicht </a>
                    <a href="">volgende: plantenkiezer</a>
                </section>

                <section>
                    <h2>Mijn tuin resultaat</h2>
                    <p>mooie icoontjes mijn tuin info</p>
                    <article>
                        <p>toon de waarden uit het formulier met icoontje dat hoort bij de waarde, indien niet leeg</p>
                        <p>garden name</p>
                        <div>sun-icon, sun-value</div>
                        <div>moist-icon, moisture-value</div>
                        <div>wind-icon, wind-value</div>
                        <div>plek-icon, radiobutton</div>
                        <div>meetlat-icon (fixed), aantal plantjes of m2</div>
                    </article>
                    <a href=""> mijn tuin bewerken</a>
                </section>

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
                    <h2>Plant catalogus </h2>
                    <p >input type="search" zoek op naam </p>
                    <p>lijst met zoekfunctie voor alle planten </p>
                    <p>map door plant namen (1e regel preview) in een collapsible button. voorbeheerders ook een bewerken-knop </p>
                    <ul>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                        <li><p>plant</p></li>
                    </ul>


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
                <section>
                    <h2>PlantjesPlanner inlogpagina</h2>
                    <LoginPage/>
                </section>
            </main>

            <footer>
                <p>footer: PlantjesPlanner door Sophie</p>
            </footer>
        </>);
}

export default App
