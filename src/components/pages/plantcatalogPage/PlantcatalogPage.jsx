import React, {useEffect, useState} from "react";
import styles from "./PlantcatalogPage.module.css";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import Button from "../../ui/button/Button.jsx";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import logo from "../../../assets/logo.svg";

import {CloudSun, Moon, Sun} from "phosphor-react";
import axios from "axios";
import {Link} from "react-router-dom";
import getErrorMessage from "../../../helpers/getErrorMessage.js";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";



function PlantcatalogPage(){
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const jwt = localStorage.getItem("jwt");

                const plantsResponse = await axios.get("http://localhost:8080/plants", {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                });

                const userResponse = await axios.get("http://localhost:8080/users/me",
                    {
                        headers: {
                            Authorization:`Bearer ${jwt}`,
                        },
                    }
                );

                setPlants(plantsResponse.data);
                setUser(userResponse.data);

            }catch (err) {
                console.error("Planten konden niet worden opgehaald", err);
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        }, []);

    async function handleDelete(plantId){
        const confirmed = window.confirm("Weet je zeker dat je deze plant wilt verwijderen?");
        if (!confirmed) return;

        try {
            const jwt = localStorage.getItem("jwt");
            await axios.delete(`http://localhost:8080/plants/${plantId}`, {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });

        setPlants(prev => prev.filter(plant => plant.id !== plantId));

        }catch (err){
            console.error("Plant verwijderen mislukt", err);
            setError(getErrorMessage(err));
        }
    }

    // if(loading) { <p> Planten laden...</p>}



    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>

                <section>
                    <h1>Plantjes catalogus </h1>
                    {error && <ErrorBox>{error}</ErrorBox>}
                    {loading && <p> Planten laden...</p>}


                    <p>Ingelogd als: {user?.username} ({user?.role}) </p>

                    {user?.role === "ADMIN" && (
                        <Link to="/plants/new">
                            <Button type="button">
                                Nieuwe plant
                            </Button>
                            </Link>
                   )}


                  {/*<div className={styles.searchBar}>*/}
                  {/*    <Button onClick={() => console.log("toon alle planten")}>*/}
                  {/*        Toon alle Planten*/}
                  {/*    </Button>*/}
                  {/*  <form onSubmit="">*/}
                  {/*      <FormInputField*/}
                  {/*          label="Zoek op plantnaam: "*/}
                  {/*          id="searchplant-field"*/}
                  {/*          name="plantname"*/}
                  {/*          value=""*/}
                  {/*          onChange=""*/}
                  {/*          type="text"*/}
                  {/*          required*/}
                  {/*          className=""*/}
                  {/*      />*/}
                  {/*      <FormButton type="submit">*/}
                  {/*          Zoeken*/}
                  {/*      </FormButton>*/}
                  {/*  </form>*/}

                  {/*  </div>*/}
                  {/*  <h2>Zoekresultaten</h2>*/}
                  {/*  <ul>*/}
                  {/*      <li>*/}
                  {/*          <details>*/}
                  {/*              <summary>*/}
                  {/*                  Voorbeeld Plant*/}
                  {/*              </summary>*/}
                  {/*              <span><img src={madelief} alt="voorbeeldplant" className={styles.madelief}/>*/}
                  {/*              </span>*/}
                  {/*              <p>Beschrijving: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis cumque deserunt dolores eaque fuga inventore ipsam ipsum iste maiores minus nam neque, pariatur, quod repellendus similique suscipit totam veritatis voluptatum.</p>*/}
                  {/*              <span><p><Sun size={24} color="#FFA500" weight="fill"/></p><p>moisture</p><p>wind</p><p>potted</p></span>*/}
                  {/*              <p>grondsoort: grond</p>*/}
                  {/*              <p>hoogte</p><p>oppervlak cm2</p>*/}
                  {/*              <p>tabel met bloeikalender</p>*/}
                  {/*          </details>*/}

                  {/*      </li>*/}
                  {/*      <li><p>plant</p></li>*/}
                  {/*      <li><p>plant</p></li>*/}
                  {/*      <li><p>plant</p></li>*/}
                  {/*  </ul>*/}
                <ul>
                    {plants.map((plant) => (
                        <li key={plant.id}>
                            <h4>{plant.dutchName} - {plant.latinName} </h4>
                            {user?.role === "ADMIN" && (
                                <>
                                <Link to={`/plants/${plant.id}/edit`}>
                                    <Button type="button">
                                        Bewerken
                                    </Button>
                                </Link>

                                <Button
                                    type = "button"
                                    onClick = {() => handleDelete(plant.id)}
                                >
                                    Verwijderen
                                </Button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>


                </section>

            </main>
        </>
    );
}
export default PlantcatalogPage;