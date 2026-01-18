import React, {useEffect, useState} from "react";
import styles from "./PlantcatalogPage.module.css";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import Button from "../../ui/button/Button.jsx";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import logo from "../../../assets/logo.svg";
import SelectedPlantsAside from "../../layout/selectedPlantsAside/SelectedPlantsAside.jsx";
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
    const [selectedPlants, setSelectedPlants] = useState([]);

    //get plants from backend
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

    //Delete plant from catalog (admin only)
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

    //get SelectedPlants from the Design of the user: first define fetchDesign as a reusable function, because it is needed for both loading the page for the first time and updating SelectedPlants
    async function fetchDesign() {


        try {
            const jwt = localStorage.getItem("jwt");

            const response = await axios.get(
                "http://localhost:8080/designs/me",
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            setSelectedPlants(response.data.selectedPlantDtoSet || []);
        } catch (error) {
            setError("Kon tuinontwerp niet ophalen");
        }
    }
    //useEffect to load design (DESIGNER role only) for the first time
    useEffect(() => {
        if(user?.role === "DESIGNER" )
        fetchDesign();
    }, []);


    //add reference to a plant and an amount to selectedPlant list (designer only)
    async function handleAddToSelectedPlants(plantId) {
        try {
            const jwt = localStorage.getItem("jwt");

            const response = await axios.post(
                "http://localhost:8080/designs/me/selected-plants",
                {
                    plantId: plantId,
                    amount: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            // backend returns a new SelectedPlantDto and frontend State is updated
            await fetchDesign(); //refresh Design

        } catch (error) {
            console.error("Plant toevoegen mislukt", error);
            setError(getErrorMessage(error));
        }
    }

    //edit the amount of a plant on the selectedPlants list:
    async function handleUpdateSelectedPlantAmount(selectedPlantId, newAmount) {


        try {
            const jwt = localStorage.getItem("jwt");

            await axios.patch(
                `http://localhost:8080/designs/me/selected-plants/${selectedPlantId}?amount=${newAmount}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            // update frontend state
            setSelectedPlants(prev =>
                prev.map(sp =>
                    sp.id === selectedPlantId
                        ? { ...sp, amount: newAmount }
                        : sp
                )
            );

        } catch (error) {
            console.error("Aantal aanpassen mislukt", error);
            setError(getErrorMessage(error));
        }
    }

    // Delete a selected plant from the Design (designer only)
    async function handleDeleteSelectedPlant(selectedPlantId) {
        try {
            const jwt = localStorage.getItem("jwt");

            await axios.delete(
                `http://localhost:8080/designs/me/selected-plants/${selectedPlantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            // update frontend state: filter for selectedPlant sp whose id is NOT equal to the id of the deleted selectedPlant
            setSelectedPlants(prev => prev.filter(sp => sp.id !== selectedPlantId));

        } catch (error) {
            console.error("Selected plant verwijderen mislukt", error);
            setError(getErrorMessage(error));
        }
    }







    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main className={styles.layout}>

                <section>
                    <h1>Plantjes catalogus </h1>
                    {error && <ErrorBox>{error}</ErrorBox>}
                    {loading && <p> Planten laden...</p>}


                    {user?.role === "ADMIN" && (
                        <Link to="/plants/new">
                            <Button type="button">
                                Nieuwe plant
                            </Button>
                            </Link>
                   )}




                <ul>
                    {plants.map((plant) => (
                        <li key={plant.id}>
                            <h4>{plant.dutchName} - {plant.latinName} </h4>

                            {/* button for designer users*/}
                            {user?.role === "DESIGNER" && (
                                <Button
                                    type="button"
                                    onClick={() => handleAddToSelectedPlants(plant.id)}
                                >
                                    Toevoegen
                                </Button>
                            )}


                            {/*buttons for admin users*/}
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

                {/*show aside only when role === "DESIGNER"*/}
                { user?.role === "DESIGNER" && (
                <SelectedPlantsAside
                    selectedPlants={selectedPlants}
                    onAmountChange={handleUpdateSelectedPlantAmount}
                    onDelete={handleDeleteSelectedPlant}
                />
                    )}
            </main>

        </>
    );
}
export default PlantcatalogPage;