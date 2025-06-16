import React from "react";

function MyGardenResult({gardenValues}) {
    return (
        <article>
            <h2>preview</h2>
            <h3>{gardenValues.gardenName}</h3>
            <p>zonlicht: {gardenValues.sunlight}</p>
            <p>vochtigheid: {gardenValues.moisture}</p>
            <p>windsterkte: {gardenValues.wind}</p>
            <p>soort tuin: {gardenValues.soilType}</p>
            <p>aantal planten: {gardenValues.numberOfPlants}</p>
            <p>oppervlak: {gardenValues.gardenSize} m<sup>2</sup></p>
        </article>
    );
}

export default MyGardenResult;