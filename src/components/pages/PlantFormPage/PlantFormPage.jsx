import React,{useState, useEffect} from "react";
import styles from "./PlantFormPage.module.css";
import NavigationBar from "../../ui/navigationbar/NavigationBar.jsx";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import Button from "../../ui/button/Button.jsx";
import FormSelect from "../../ui/FormSelect/FormSelect.jsx";
import FormCheckbox from "../../ui/formCheckbox/FormCheckbox.jsx";


function PlantFormPage({mode}){
    const {id} = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        // this bit replaces the decimal symbol from number type inputs comma ',' with point '.'
        const payload = {
            ...plant,
            height: plant.height
                ? plant.height.replace(",",".")
                : 0,
            footprint: plant.footprint
                ? plant.footprint.replace(",",".")
                : 0,
        };

        //create form data for the POST request
        const formData = new FormData();
        formData.append(
            "plant", new Blob([JSON.stringify(payload)], {type:"application/json" })
        );

        // later:
        // if (imageFile) {
        //   formData.append("image", imageFile);
        // }


        try{
            const jwt = localStorage.getItem("jwt");

            await axios.post(
                "http://localhost:8080/plants", formData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
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
                        <FormSelect
                            label="kleurcategorie bloemen"
                            id="bloomColorGroup"
                            name="bloomColorGroup"
                            value={plant.bloomColorGroup}
                            onChange={handleChange}
                            options={[ "ROOD", "ORANJE", "GEEL", "GROEN", "BLAUW", "PAARS", "ROZE", "WIT", "BRUIN", "MIX", "OVERIG", "GEEN"
                            ]}
                        />

                        <FormSelect
                            label="Zonlicht"
                            id="sunlight"
                            name="sunlight"
                            value={plant.localeDto.sunlight}
                            onChange={handleLocaleChange}
                            options={["ZONNIG", "HALFSCHADUW", "SCHADUW"]}
                        />

                        <FormSelect
                            label="Vochtigheid"
                            id="moisture"
                            name="moisture"
                            value={plant.localeDto.moisture}
                            onChange={handleLocaleChange}
                            options={[ "DROOG", "MATIG_VOCHTIG", "VOCHTIG", "NAT"
                            ]}
                        />

                        <FormSelect
                            label="Windbestendigheid"
                            id="windTolerance"
                            name="windTolerance"
                            value={plant.localeDto.windTolerance}
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