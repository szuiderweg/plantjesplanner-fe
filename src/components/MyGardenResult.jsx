import React from "react";
import {CloudSun, Moon, Sun} from "phosphor-react";

function lichtEmoji(licht) {
    if (licht === "ZONNIG") return "☀️";
    if (licht === "HALFSCHADUW") return "⛅";
    if (licht === "SCHADUW") return "🌑";
    return "";
}

function lichtIcoon(licht) {
    if (licht === "ZONNIG") return <Sun size={24} color="#FFA500" weight="fill" />;
    if (licht === "HALFSCHADUW") return <CloudSun size={24} color="#FFD700" weight="duotone" />;
    if (licht === "SCHADUW") return <Moon size={24} color="#333366" weight="fill" />;
    return null;
}

function MyGardenResult({gardenValues}) {
    return (
        <article>
            <h2>preview</h2>
            <h3>{gardenValues.gardenName}</h3>
            <p>zonlicht: {gardenValues.sunlight} {lichtIcoon(gardenValues.sunlight)}</p>
            <p>vochtigheid: {gardenValues.moisture}</p>
            <p>windsterkte: {gardenValues.wind}</p>
            <p>soort tuin: {gardenValues.soilType}</p>
            <p>aantal planten: {gardenValues.numberOfPlants}</p>
            <p>oppervlak: {gardenValues.gardenSize} m<sup>2</sup></p>
        {/*    todo: soiltype toevoegen*/}
        </article>
    );
}

export default MyGardenResult;