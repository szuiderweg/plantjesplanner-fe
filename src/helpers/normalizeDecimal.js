//helper to replace the decimal symbol comma ',' with point '.' so the backend recognizes it as a decimal number.
export default function normalizeDecimal(value){
    //return 0 if value is not a number
    if (value === null || value === undefined || value === "") return 0;

    //return unchanged value if value is a number (with a .)
    if (typeof value === "number") return value;
    //otherwise replace ',' with '.'
    return value.replace(",",".");
}
