import React, {useEffect, useState} from "react";
import styles from "./SelectedPlantsAside.module.css"
import FormInputField from "../../ui/formInputField/FormInputField.jsx";
import Button from "../../ui/button/Button.jsx";


function SelectedPlantsAside({ selectedPlants = [] , onAmountChange, onDelete }) {
    //editing amounts of selected plant is done using a form + submit button.
    //initial values from selectedPlants (selectedPlant.id and selectedPlant.amount) are loaded and stored in a state object that the form can access.
    const [formValues, setFormValues] = useState({});



    useEffect(() => {
        const initial = {};

        for(const sp of selectedPlants){
            initial[sp.id] = sp.amount;
        }
        setFormValues(initial);
    }, [selectedPlants]);

    function handleSubmit(e){
        e.preventDefault();

        let didUpdate = false; //stores  if amount of plants has changed outside the for-loop to trigger an alert.
        //iterate over selectedPlants and trigger the onAmountChange function if the amount of a selectedPlant has changed
        for(const sp of selectedPlants){
            const newAmount = Number(formValues[sp.id]);
            if(newAmount !== sp.amount){
                onAmountChange(sp.id, newAmount);
                didUpdate = true;
            }
        }
        if(didUpdate){
            alert("Jouw selectie is opgeslagen")
        }

    }


    if (!selectedPlants || selectedPlants.length === 0) { //message when selectedPlant list is empty
        return (
            <aside className={styles.aside}>
                <h3 className={styles.title}>Mijn planten</h3>
                <p>Je hebt nog geen planten toegevoegd.</p>
            </aside>
        );
    }

    return (
        <aside className={styles.aside}>
            <h3 className={styles.title}>Mijn planten</h3>

            <form onSubmit={handleSubmit}>
            <ul className={styles.list}>
                {selectedPlants.map((sp) => {
                        // fix crash that occurs when attempting to render  when PlantDto does not exist: Return nothing if plantDto is null
                        if (!sp.plantDto) return null;

                        return(
                        <li key={sp.id} className={styles.listItem}>
                            <span> {sp.plantDto.dutchName}</span>
                           <FormInputField id={styles.amountInput}
                                type = "number"
                                min ="1"
                                value = {formValues[sp.id] ?? ""}
                                onChange = {(e) => setFormValues(prev => ({
                                    ...prev,
                                    [sp.id]:e.target.value
                                }))
                                }
                           />

                            <Button
                                type = "button"
                                onClick = {() => onDelete(sp.id)}
                            >
                                X
                            </Button>
                        </li>
                        );
                })}
            </ul>
                <Button id={styles.saveButton} type="submit" >Opslaan</Button>
            </form>
        </aside>
    );
}

export default SelectedPlantsAside;
