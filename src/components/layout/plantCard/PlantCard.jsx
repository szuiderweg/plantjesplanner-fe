import React, { useState} from "react";
import styles from "./PlantCard.module.css";
import defaultPlant from '../../../assets/default_plant.jpg';
import {Flower} from "phosphor-react";
import axios from "axios";

function PlantCard({ plant,  }){
    const [isOpen, setIsOpen] = useState(false);//registers if drop-down part of <details> element is open or not
    const [imageUrl, setImageUrl] = useState(null);// URL to plant avatarimage
    const [imageError, setImageError] = useState(false);// trigger for fallback is case of missing image

    //array with months of the year keys that match the variable names in the BloomingCalendarDto from the backend and labels that are shown in the plantcard
    const MONTHS = [
        { key: "january", label: "Jan" },
        { key: "february", label: "Feb" },
        { key: "march", label: "Mrt" },
        { key: "april", label: "Apr" },
        { key: "may", label: "Mei" },
        { key: "june", label: "Jun" },
        { key: "july", label: "Jul" },
        { key: "august", label: "Aug" },
        { key: "september", label: "Sep" },
        { key: "october", label: "Okt" },
        { key: "november", label: "Nov" },
        { key: "december", label: "Dec" },
    ];


    //GET plant image when details element is dropped down
    async function handleToggle(event){
        const open = event.target.open;
        setIsOpen(open);

        //load image only once: when dropdown of details-element is opened, imageURL is empty and imageError is false
        if (open && !imageUrl && !imageError){
            try{
                const jwt = localStorage.getItem("jwt");
                //API call GET plant image
                const response = await axios.get(
                    `http://localhost:8080/plants/${plant.id}/avatar`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                        responseType: "blob",
                    }
                );
                const imageObjectUrl = URL.createObjectURL(response.data);
                setImageUrl(imageObjectUrl);

        }catch(error){
                console.error("Afbeelding laden mislukt", error);
                setImageError(true);
            }
        }

    }

    return(
        <details className={styles.card} onToggle={handleToggle}>
            <summary className={styles.summary}>
                <span>{plant.dutchName} - {plant.latinName} </span>
            </summary>

        {/*    dropdown content*/}
            <div className={styles.content}>
        {/*    show plant image LEFT */}

                <div className={styles.imageColumn}>    {/* happy scenario: plant image is present*/}
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={plant.dutchName}
                            className={styles.image}
                        />
                    )}


                    {!imageUrl && (
                        <div className={styles.imagePlaceholder}>  {/* plant image is not present > show placeholder image*/}
                            <img
                                src={defaultPlant}
                                alt={plant.dutchName}
                                className={styles.image}
                            />
                        </div>
                    )}
                </div>

                {/* show plant info MIDDLE */}
                <div className={styles.detailsColumn}>
                    <p>
                        {plant.description}
                    </p>

                    <h4>Standplaats & eigenschappen</h4>
                    <ul className={styles.localeList}>
                        <li>Zonlicht: {plant.localeDto.sunlight}, Vocht: {plant.localeDto.moisture}, Wind: {plant.localeDto.windTolerance}</li>


                        <li>
                            Alleen volle grond:{" "}
                            {plant.localeDto.openGroundOnly ? "Ja" : "Nee"}
                        </li>
                        <li>Bodem: {plant.localeDto.soilType}</li>
                    </ul>

                    <h4>Afmetingen</h4>
                    <ul>
                        <li>Hoogte: {plant.height} m, Oppervlak: {plant.footprint} m²</li>
                        <li></li>
                    </ul>

                    <h4>Bloeiperiode</h4>
                    <table className={styles.bloomTable}>
                        <thead>
                        <tr>
                            {MONTHS.map(month => (
                                <th key={month.key}>{month.label}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {MONTHS.map(month => (
                                <td key={month.key}>
                                    {plant.bloomingCalendarDto?.[month.key] ? <Flower size={32} color={plant.bloomColorHex}  weight="fill"/> : ""}
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </details>
    );
}

export default PlantCard;