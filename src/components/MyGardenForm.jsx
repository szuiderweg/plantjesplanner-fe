import React, { useState } from "react";
import MyGardenResult from "./MyGardenResult.jsx";

function MyGardenForm() {
    //use State for the form and the preview
    const [gardenValues, setGardenValues] = useState({
        gardenName:"mijn prachtige tuin",
        sunlight:"",
        moisture:"",
        wind:"",
        soilType:"",
        numberOfPlants:"",
        gardenSize:""
    }); //

    //change handler
    function handleChange(e){
        const {name, value} = e.target;
        setGardenValues((prev) => ({
            ...prev,
            [name]:value
        }));
    }
    //voor het ontwikkelen een console.log
    React.useEffect(() => {
        console.log(gardenValues);
    }, [gardenValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const openGround = gardenValues.soilType === "openGround";// translate radiobutton values to a boolean to match the property expected by the backend todo hier komen de andere velden ook bij

        // Stuur naar backend, bijvoorbeeld:
        // fetch('/api/planten', { method: 'POST', body: JSON.stringify({ volleGrond }) })
        // alert(`Dit wordt naar de backend gestuurd: volleGrond = ${openGround}`);//todo hier iets moois van maken
        console.log("myGarden form submitted")
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            {/*name of garden*/}
            <label htmlFor="garden-name-field">Waar gaan de planten wonen?
                <input
                    type="text"
                    id="garden-name-field"
                    name="gardenName"
                    onChange={handleChange}
                    placeholder="mijn prachtige tuin"
                />

                {/*sunlight in garden*/} </label>
            <label htmlFor="garden-sunlight-field">Hoeveel zonlicht schijnt hier?
                <select
                    name="sunlight"
                    id="garden-sunlight-field"
                    value={gardenValues.sunlight}
                    onChange={handleChange}
                >
                    <option value="">selecteer...</option>
                    <option value="ZONNIG">zonnig</option>
                    <option value="HALFSCHADUW">halfschaduw</option>
                    <option value="SCHADUW">schaduw</option>
                </select>
            </label>

            {/*moisture in garden*/}
            <label htmlFor="garden-moisture-field">Hoe de vochtig is het?
                <select
                    name="moisture"
                    id="garden-moisture-field"
                    value={gardenValues.moisture}
                    onChange={handleChange}>
                    <option value="">selecteer...</option>
                    <option value="DROOG">droog</option>
                    <option value="MATIG_VOCHTIG">matig vochtig</option>
                    <option value="VOCHTIG">vochtig</option>
                    <option value="NAT">nat</option>
                </select>
            </label>
            {/*wind in garden*/}
            <label htmlFor="garden-wind-field">Hoeveel wind staat er?
                <select
                    name="wind"
                    id="garden-wind-field"
                    value={gardenValues.sunlight}
                    onChange={handleChange}
                    >
                    <option value="">selecteer...</option>
                    <option value="STERKE_WIND">sterke wind</option>
                    <option value="GEMIDDELD">gemiddeld</option>
                    <option value="BESCHUT">beschut</option>
                </select>
            </label>

                <legend>Komen de planten in volle grond te staan of in potten?</legend>{/*radiobutton question*/}
                <label>
                    <input
                        type="radio"
                        name="soilType"
                        value="openGround"
                        checked={gardenValues.soilType === "openGround"}
                        onChange={handleChange}
                    />
                    Volle grond
                </label>
                <label>
                    <input
                        type="radio"
                        name="soilType"
                        value="pots"
                        checked={gardenValues.soilType === "pots"}
                        onChange={handleChange}
                    />
                    Potten
                </label>

            {/* conditional rendering of followup question after the soiltype question */}
            {/*for potted plants: how many plants? */}
            {gardenValues.soilType === "pots" && (
                <div>
                    <label htmlFor="number-of-plants-field">Hoeveel planten wil je kiezen?
                    <input
                        type="number"
                        id="number-of-plants-field"
                        name="numberOfPlants"
                        onChange={handleChange}
                    /> stuks </label>
                </div>
            )}
            {/*for open ground: how much area [m2] to be planted?  */}
            {gardenValues.soilType === "openGround" && (
                <div>
                    <label htmlFor="gardensize-field">hoeveel ruimte ga je beplanten?:
                        <input
                            type="number"
                            id="gardensize-field"
                            name="gardenSize"
                            onChange={handleChange}
                        /> m<sup>2</sup></label>
                </div>
            )}
            {/*end of conditional questions*/}
            <button type="submit" >Opslaan</button>
        </form>

            {/* result of form answers*/}
           <MyGardenResult gardenValues={gardenValues}/>

        </>
    );
}

export default MyGardenForm;