import React, { useState, useEffect } from "react";

import axios from "axios";
import getErrorMessage from "../../../helpers/getErrorMessage.js";
import normalizeDecimal from "../../../helpers/normalizeDecimal.js";
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import FormSelect from "../../ui/FormSelect/FormSelect.jsx";
import FormCheckbox from "../../ui/formCheckbox/FormCheckbox.jsx";
import Button from "../../ui/button/Button.jsx";
import ErrorBox from "../../ui/errorBox/ErrorBox.jsx";


function MyGardenForm() {
    //use State for the form and the preview
    const [gardenValues, setGardenValues] = useState({
        title: "",
        gardenSize: "",
        localeDto: {
            sunlight: "",
            moisture: "",
            windTolerance: "",
            soilType: "",
            openGroundOnly: false
        }
    });

    const [error, setError] = useState("");

    // useEffect to retrieve existing Design (excluding SelectedPlants collection) from backend
    useEffect(() => {
        async function fetchGardenValues() {
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

                setGardenValues(response.data);
            } catch (error) {
                setError(getErrorMessage(error));
            }
        }

        fetchGardenValues();
    }, []);


    //submit form handler for PUT /designs/me request
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const jwt = localStorage.getItem("jwt");

            await axios.put(
                "http://localhost:8080/designs/me",
                {
                    ...gardenValues,
                    gardenSize: normalizeDecimal(gardenValues.gardenSize),
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            alert("Tuinontwerp opgeslagen");
        } catch (error) {
            setError(getErrorMessage(error));
        }
    }


    //change handler
    function handleChange(e){
        const {name, value} = e.target;
        setGardenValues((prev) => ({
            ...prev,
            [name]:value,
        }));
    }

    //change handlers for nested Locale dto
    function handleLocaleChange(e){
        const{name, value, type, checked} = e.target;
        setGardenValues(prev=> ({
            ...prev,
            localeDto: {
                ...prev.localeDto,
                [name]:
                    type === "checkbox" ? checked : value,
            },
        }));
    }

    return (
        <>
            {error && <ErrorBox>{error}</ErrorBox>}

            <h1> Mijn tuin</h1>
            <form onSubmit={handleSubmit}>
                <FormInputField
                    label="Naam van je tuin"
                    id="title"
                    name="title"
                    value={gardenValues.title}
                    onChange={handleChange}
                    placeholder="Mijn prachtige tuin"
                    required
                />

                <FormInputField
                    label="Oppervlakte (m²)"
                    id="gardenSize"
                    name="gardenSize"
                    type="number"
                    step="0.1"
                    value={gardenValues.gardenSize}
                    onChange={handleChange}
                />

                <FormSelect
                    label="Zonlicht"
                    id="sunlight"
                    name="sunlight"
                    value={gardenValues.localeDto.sunlight ?? ""}
                    required
                    onChange={handleLocaleChange}
                    options={["ZONNIG", "HALFSCHADUW", "SCHADUW"]}
                />

                <FormSelect
                    label="Vochtigheid"
                    id="moisture"
                    name="moisture"
                    value={gardenValues.localeDto.moisture ?? ""}
                    required
                    onChange={handleLocaleChange}
                    options={["DROOG", "MATIG_VOCHTIG", "VOCHTIG", "NAT"]}
                />

                <FormSelect
                    label="Wind"
                    id="windTolerance"
                    name="windTolerance"
                    value={gardenValues.localeDto.windTolerance ?? ""}
                    required
                    onChange={handleLocaleChange}
                    options={["STERKE_WIND", "GEMIDDELD", "BESCHUT"]}
                />

                <FormInputField
                    label="Grondsoort"
                    id="soilType"
                    name="soilType"
                    value={gardenValues.localeDto.soilType}
                    onChange={handleLocaleChange}
                />

                <FormCheckbox
                    label="Planten in volle grond"
                    id="openGroundOnly"
                    name="openGroundOnly"
                    checked={gardenValues.localeDto.openGroundOnly}
                    onChange={handleLocaleChange}
                />

                <Button type="submit">Opslaan</Button>
            </form>




        </>
    );
}

export default MyGardenForm;