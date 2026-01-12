function getErrorMessage(error){
    if (error.response?.data){
        return error.response.data;
    }
    if (error.message){
        return error.message;
    }
    return "Er is een onbekende fout opgetreden."
}

export default getErrorMessage;