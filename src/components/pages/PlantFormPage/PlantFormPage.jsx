import React,{useState, useEffect} from "react";
import styles from "./PlantFormPage.module.css";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import Button from "../../ui/button/Button.jsx";


function PlantFormPage({mode}){
    const {id} = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const jwt = localStorage.getItem("jwt");

            await axios.post(
                "http://localhost:8080/plants", plant,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type":"application/json",
                    },
                }
            );

        //     return to Plant catalogpage after successful save
        navigate("/catalog");
        }catch (error){
            console.error("Plant opslaan mislukt", error);
            alert("Plant kon niet worden opgeslagen");
        }
    }

    const[plant, setPlant] = useState({
        dutchName: "",
        latinName: "",
        description: "",
        height: "",
        footprint: "",
        bloomColorHex: "",
        bloomColorGroup: "",
        published: true,

        localeDto: {
            sunlight: "",
            moisture: "",
            windTolerance: "",
            soilType: "",
            openGroundOnly: false,
        },

        bloomingCalendarDto: {
            january: false,
            february: false,
            march: false,
            april: false,
            may: false,
            june: false,
            july: false,
            august: false,
            september: false,
            october: false,
            november: false,
            december: false,
        }

    });




    function handleChange(e){
        const{ name, value, type, checked } = e.target;
        setPlant(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function handleLocaleChange(e){
        const{name, value, type, checked} = e.target;
        setPlant(prev=> ({
            ...prev,
            localeDto: {
                ...prev.localeDto,
                [name]: type === "checkbox" ? checked : value,
            },
        }));
    }

    function handleBloomingChange(e) {
        const {name, checked} = e.target;

        setPlant(prev => ({
            ...prev,
            bloomingCalendarDto: {
                ...prev.bloomingCalendarDto,
                [name]: checked,
            },
        }));
    }



    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
                <section>
                    <h1>
                        Plant Formulier
                    </h1>
                    {/*todo: form velden compleet maken*/}
                    <form onSubmit={handleSubmit}>
                        <FormInputField
                            label="Nederlandse naam"
                            id="dutchName"
                            name="dutchName"
                            value={plant.dutchName}
                            onChange={handleChange}
                            required
                        />

                        <FormInputField
                            label="Latijnse naam"
                            id="latinName"
                            name="latinName"
                            value={plant.latinName}
                            onChange={handleChange}
                        />

                        <FormInputField
                            label="Beschrijving"
                            id="description"
                            name="description"
                            value={plant.description}
                            onChange={handleChange}
                        />

                        <FormInputField
                            label="Hoogte (m)"
                            id="height"
                            name="height"
                            type="number"
                            step="0.01"
                            value={plant.height}
                            onChange={handleChange}
                        />

                        <FormInputField
                            label="Oppervlak (m2)"
                            id="footprint"
                            name="footprint"
                            type="number"
                            step="0.01"
                            value={plant.footprint}
                            onChange={handleChange}
                        />
                        <FormInputField
                            label="Kleurcode (HEX)"
                            id="bloomColorHex"
                            name="bloomColorHex"
                            value={plant.bloomColorHex}
                            placeholder="#000000"
                            onChange={handleChange}
                        />



                        <Button type="submit">
                            Opslaan
                        </Button>
                    </form>

                </section>

            </main>

        </>


    );
}

export default PlantFormPage;