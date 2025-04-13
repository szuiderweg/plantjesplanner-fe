import './App.css'

function App() {

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
                        <li><button type="button">uitloggen</button></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section>
                    <form>
                        <h2>Hoe gaan de plantjes wonen?</h2>
                        <p>alle vragen zijn optioneel</p>
                        <p>label:geef het tuintje een naam, input type tekst, default "mijn tuin" </p>

                        <p>label: "zonlicht" , dropdown: ZONNIG, HALFSCHADUW, SCHADUW</p>
                        <p>label:"vochtigheid", dropdown: DROOG, MATIG_VOCHTIG, VOCHTIG, NAT</p>
                        <p>label: "wind", dropdown: STERKE_WIND, GEMIDDELD, BESCHUT</p>
                        <p>plantjes wonen in: radiobuttons: button 1: potten, button 2: volle grond</p>
                        <p>label: beschikbare ruimte. if radiobutton: volle grond dan oppervlak in m2 (getal, 4
                            decimalen). IF radiobutton: potplanten dan Aantal planten (getal, integer)</p>
                        <button type="submit">Opslaan</button>
                        <a href="">terug naar ontwerp</a><p>voorwaardelijk indien info is opgeslagen</p>
                    </form>

                    <h2>preview</h2>
                    <article>
                        <p>toon de waarden uit het formulier met icoontje dat hoort bij de waarde, indien niet leeg</p>
                        <p>garden name</p>
                        <div>sun-icon, sun-value</div>
                        <div>moist-icon, moisture-value</div>
                        <div>wind-icon, wind-value</div>
                        <div>plek-icon, radiobutton</div>
                        <div>meetlat-icon (fixed), aantal plantjes of m2</div>
                    </article>
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
                    <p>hier komt een formulier voor alle plant properties</p>
                </section>

                <section>
                    <h2>Plant info blokje van 1 plant </h2>
                    <p>mooi blokje (article?) met plant info en plant avatar </p>
                </section>

                <section>
                    <h2>Plant catalogus </h2>
                    <p>lijst met zoekfunctie voor alle planten </p>
                </section>

                <section>
                    <h2>Plantjeskiezer</h2>
                    <p>plantencatalogus met zoek en filterfunctie en ding om plantenselectie te maken </p>
                    <p>planten match functie?</p>
                </section>

                <section>
                    <h2>Plantjeskeuze</h2>
                    <p>planten lijstje met statistieken </p>
                    <p>planten match functie?</p>
                </section>
                <section>
                    <h2>moodboardmaker</h2>
                    <p>9 tegels bij elkaar </p>
                </section>
                <section>
                    <h2>moodboard</h2>
                    <p>statische versie </p>
                </section>
                <section>
                    <h2>mijn account</h2>
                    <p>eigen inlog aanpassen</p>
                </section>
                <section>
                    <h2>gebruikers beheer</h2>
                    <p>lijst met alle gebruikers</p>
                    <p>dingetje om mensen admin te maken</p>
                </section>
                <section>
                    <h2>PlantjesPlanner</h2>
                    <p>hier komt de inlogpagina</p>
                </section>
            </main>

            <footer>
                <p>footer: PlantjesPlanner door Sophie</p>
            </footer>
        </>)
}

export default App
