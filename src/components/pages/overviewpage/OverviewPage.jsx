import React, {useEffect, useState} from "react";
import styles from "./OverviewPage.module.css";
import NavigationBar from "../../layout/navigationbar/NavigationBar.jsx";
import axios from "axios";
import getErrorMessage from "../../../helpers/getErrorMessage.js";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

function OverviewPage(){
    const {jwt, username, role} = useAuth();
    const [design, setDesign] = useState(null);
    const [selectedPlants, setSelectedPlants] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!jwt) return;

        if(role !== "DESIGNER"){
            setLoading(false);
            return;
        }
        async function fetchDesign() {

            try {
                const response = await axios.get(
                    "http://localhost:8080/designs/me",
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                setDesign(response.data);
                setSelectedPlants(response.data.selectedPlantDtoSet || []);


            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        }

        if (role === "DESIGNER") {
            fetchDesign();
        }
    }, [jwt, role]);

    if (loading) return <p>Ontwerp laden…</p>;
    if (error) return <ErrorBox>{error}</ErrorBox>;

    const { title, gardenSize, localeDto } = design || {}; // destructure design properties for readability in return statement

    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
                {role === "DESIGNER" ? (
                    <>
                    <section>
                        <h1>{title || "Mijn tuin"}</h1>

                        <ul>
                            <li>Bodem: {localeDto?.soilType || "—"}</li>
                            <li>
                                Alleen volle grond:{" "}
                                {localeDto?.openGroundOnly ? "Ja" : "Nee"}
                            </li>
                            <li>Oppervlakte:{" "}
                                {gardenSize ? `${gardenSize} m²` : "Onbekend"}</li>
                            <li>Zonlicht: {localeDto?.sunlight ?? "—"}</li>
                            <li>Vochtigheid: {localeDto?.moisture ?? "—"}</li>
                            <li>Wind: {localeDto?.windTolerance ?? "—"}</li>
                        </ul>
                    </section>

                    <section>
                        <h2> Mijn planten </h2>
                            <ul>
                                {selectedPlants.map((sp) => {
                                    // fix crash that occurs when attempting to render  when PlantDto does not exist: Return nothing if plantDto is null
                                    if (!sp.plantDto) return null;

                                    return (
                                        <li key={sp.id}>
                                            <span>{sp.amount} x {sp.plantDto.dutchName}  </span>
                                        </li>
                                    )
                                })}
                            </ul>
                    </section>
                </>
                    ) : (
                    <section>
                        <h1>Welkom {username}</h1>
                    </section>
                )}
            </main>
        </>
    );
}
export default OverviewPage;