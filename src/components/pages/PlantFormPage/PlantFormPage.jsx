import React,{useState, useEffect} from "react";
import styles from "./PlantFormPage.module.css";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import Button from "../../ui/button/Button.jsx";
import FormSelect from "../../ui/FormSelect/FormSelect.jsx";
import FormCheckbox from "../../ui/formCheckbox/FormCheckbox.jsx";
import getErrorMessage from "../../../helpers/getErrorMessage.js";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";


function PlantFormPage({mode}){
    const {id} = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    // for editing mode only: useEffect to retrieve existing plant data from backend
    useEffect(()=> {
        if (mode !== "edit") return;

        async function fetchPlant(){
            try{
                const jwt = localStorage.getItem("jwt");

                const response = await axios.get(
                    `http://localhost:8080/plants/${id}`,
                    {
                        headers:{
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                setPlant(response.data);
            } catch(error){
                console.error("plant ophalen mislukt, error");
                setError(getErrorMessage(error));
            }
        }
        fetchPlant();
    }, [mode, id]);

    //helper to fill formData for POST and PUT requests
    function buildFormData(){
        // this bit
        const payload = {
            ...plant,
            height: normalizeDecimal(plant.height),
            footprint: normalizeDecimal(plant.footprint),
        };

        //create form data for plant
        const formData = new FormData();
        formData.append(
            "plant", new Blob([JSON.stringify(payload)], {type:"application/json" })
        );

        //add image file for upload to formData if present
        if (image) {
            formData.append("image", image);
        }
        return formData;
    }

    //helper to replace the decimal symbol comma ',' with point '.' so the backend recognizes it as a decimal number.
    function normalizeDecimal(value){
        //return 0 if value is not a number
        if (value === null || value === undefined || value === "") return 0;

        //return unchanged value if value is a number (with a .)
        if (typeof value === "number") return value;
        //otherwise replace ',' with '.'
        return value.replace(",",".");
    }



    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const jwt = localStorage.getItem("jwt");
            const formData = buildFormData();

            //if the page is in edit-mode, do PUT request, else do POST request
            if( mode === "edit"){
                await axios.put(
                    `http://localhost:8080/plants/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

            }else{
                await axios.post(
                    "http://localhost:8080/plants", formData,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );
            }

        //     return to Plant catalogpage after successful save
        navigate("/catalog")
        alert("Plant is opgeslagen");
        }catch (error){
            console.error("Plant opslaan mislukt", error);
            setError(getErrorMessage(error));
        }
    }

    const[plant, setPlant] = useState({
        dutchName: "",
        latinName: "",
        description: "",
        height: "",
        footprint: "",
        bloomColorHex: "",
        bloomColorGroup: null,
        published: true,

        localeDto: {
            sunlight: null,
            moisture: null,
            windTolerance: null,
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

    const [image, setImage] = useState(null);




    function handleChange(e){
        const{ name, value, type, checked } = e.target;
        setPlant(prev => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value === ""
                        ? null
                        : value,
        }));
    }

    function handleLocaleChange(e){
        const{name, value, type, checked} = e.target;
        setPlant(prev=> ({
            ...prev,
            localeDto: {
                ...prev.localeDto,
                [name]:
                    type === "checkbox"
                        ? checked :
                        value === ""
                        ? null
                        : value,
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

    function handleImageChange(e){
        const file = e.target.files[0];
        setImage(file);
    }



    return(
        <>
            <header>
                <NavigationBar/>
            </header>

            <main>
                <section>
                    <h1>
                        {mode === "edit" ? "Plant bewerken" :"Nieuwe plant opslaan"}
                    </h1>

                    {error && <ErrorBox>{error}</ErrorBox>}

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
                        <FormSelect
                            label="kleurcategorie bloemen"
                            id="bloomColorGroup"
                            name="bloomColorGroup"
                            value={plant.bloomColorGroup ?? ""}
                            required
                            onChange={handleChange}
                            options={[
                                "ROOD", "ORANJE", "GEEL", "GROEN", "BLAUW", "PAARS", "ROZE", "WIT", "BRUIN", "MIX", "OVERIG", "GEEN"
                            ]}
                        />

                        <FormSelect
                            label="Zonlicht"
                            id="sunlight"
                            name="sunlight"
                            value={plant.localeDto.sunlight ?? ""}
                            required
                            onChange={handleLocaleChange}
                            options={["ZONNIG", "HALFSCHADUW", "SCHADUW"]}
                        />

                        <FormSelect
                            label="Vochtigheid"
                            id="moisture"
                            name="moisture"
                            value={plant.localeDto.moisture ?? ""}
                            required
                            onChange={handleLocaleChange}
                            options={[ "DROOG", "MATIG_VOCHTIG", "VOCHTIG", "NAT"
                            ]}
                        />

                        <FormSelect
                            label="Windbestendigheid"
                            id="windTolerance"
                            name="windTolerance"
                            value={plant.localeDto.windTolerance ?? ""}
                            required
                            onChange={handleLocaleChange}
                            options={[ "STERKE_WIND", "GEMIDDELD", "BESCHUT"
                            ]}
                        />

                        <FormInputField
                            label="Grondsoort"
                            id="soilType"
                            name="soilType"
                            value={plant.localeDto.soilType}
                            onChange={handleLocaleChange}
                        />
                        <FormCheckbox
                            label="Alleen geschikt voor volle grond"
                            id="openGroundOnly"
                            name="openGroundOnly"
                            checked={plant.localeDto.openGroundOnly}
                            onChange={handleLocaleChange}
                        />

                        <FormCheckbox
                            label="januari"
                            id="january"
                            name="january"
                            checked={plant.bloomingCalendarDto.january}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="februari"
                            id="february"
                            name="february"
                            checked={plant.bloomingCalendarDto.february}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="maart"
                            id="march"
                            name="march"
                            checked={plant.bloomingCalendarDto.march}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="april"
                            id="april"
                            name="april"
                            checked={plant.bloomingCalendarDto.april}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="mei"
                            id="may"
                            name="may"
                            checked={plant.bloomingCalendarDto.may}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="juni"
                            id="june"
                            name="june"
                            checked={plant.bloomingCalendarDto.june}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="juli"
                            id="july"
                            name="july"
                            checked={plant.bloomingCalendarDto.july}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="augustus"
                            id="august"
                            name="august"
                            checked={plant.bloomingCalendarDto.august}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="september"
                            id="september"
                            name="september"
                            checked={plant.bloomingCalendarDto.september}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="oktober"
                            id="october"
                            name="october"
                            checked={plant.bloomingCalendarDto.october}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="november"
                            id="november"
                            name="november"
                            checked={plant.bloomingCalendarDto.november}
                            onChange={handleBloomingChange}
                        />

                        <FormCheckbox
                            label="december"
                            id="december"
                            name="december"
                            checked={plant.bloomingCalendarDto.december}
                            onChange={handleBloomingChange}
                        />

                        <label>
                            Plant afbeelding (optioneel)
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>

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