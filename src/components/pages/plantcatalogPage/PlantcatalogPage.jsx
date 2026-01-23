import React, {useEffect, useState} from "react";
import styles from "./PlantcatalogPage.module.css";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import Button from "../../ui/button/Button.jsx";
import SelectedPlantsAside from "../../layout/selectedPlantsAside/SelectedPlantsAside.jsx";
import axios from "axios";
import {Link} from "react-router-dom";
import getErrorMessage from "../../../helpers/getErrorMessage.js";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";
import PlantCard from "../../layout/plantCard/PlantCard.jsx"
import { useAuth } from "../../../context/AuthContext.jsx";




function PlantcatalogPage(){
    const { jwt, role } = useAuth(); // use context
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedPlants, setSelectedPlants] = useState([]);

    //get plants from backend
    useEffect(() => {
        async function fetchData() {
            if(!jwt) return;
            try {

                const plantsResponse = await axios.get("http://localhost:8080/plants", {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                });
                setPlants(plantsResponse.data);


            }catch (err) {
                console.error("Planten konden niet worden opgehaald", err);
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        }, [jwt]);

    //get SelectedPlants from the Design of the user

    useEffect(() => {
    async function fetchDesign() {
        if (!jwt || role !== "DESIGNER") return;//only get design when user has the role DESIGNER
        try {
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
    fetchDesign();
    }, [jwt, role ]);

    // timer for errorbox: error should disappear after 5 seconds
    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError(""); // clear error
        }, 5000); // 5 seconds

        return () => clearTimeout(timer); // cleanup afterwards
    }, [error]);


    //Delete plant from catalog (admin only)
    async function handleDelete(plantId){
        if (!jwt || role !== "ADMIN" ) return;
        const confirmed = window.confirm("Weet je zeker dat je deze plant wilt verwijderen?");
        if (!confirmed) return;

        try {
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




    //add reference to a plant and an amount to selectedPlant list (designer only)
    async function handleAddToSelectedPlants(plantId) {
        if (!jwt || role !== "DESIGNER") return
        try {
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
            setSelectedPlants(response.data.selectedPlantDtoSet || []);
            alert("Plant is toegevoegd aan jouw ontwerp");

        } catch (error) {
            console.error("Plant toevoegen mislukt", error);
            setError(getErrorMessage(error));
        }
    }

    //edit the amount of a plant on the selectedPlants list:
    async function handleUpdateSelectedPlantAmount(selectedPlantId, newAmount) {
        if (!jwt || role !== "DESIGNER") return;
        try {
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
        if (!jwt || role !== "DESIGNER") return;
        try {
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

            <main className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                <section>
                    <h1>Plantjes catalogus </h1>
                    {error && <ErrorBox>{error}</ErrorBox>}
                    {loading && <p> Planten laden...</p>}


                    {role === "ADMIN" && (
                        <Link to="/plants/new">

                            <Button type="button">
                                Nieuwe plant
                            </Button>
                            </Link>
                   )}




                <ul>
                    {plants.map((plant) => (
                        <li key={plant.id } className={styles.plantItem}>
                            <PlantCard
                                plant = {plant}
                                userRole={role}
                                onAddToDesign={handleAddToSelectedPlants}
                                onDelete={handleDelete}
                            />
                        </li>
                    ))}
                </ul>


                </section>

                {/*show aside only when role === "DESIGNER"*/}
                { role === "DESIGNER" && (
                <SelectedPlantsAside className={styles.selectedPlantsAside}
                    selectedPlants={selectedPlants}
                    onAmountChange={handleUpdateSelectedPlantAmount}
                    onDelete={handleDeleteSelectedPlant}
                />
                    )}
                </div>
            </main>

        </>
    );
}
export default PlantcatalogPage;