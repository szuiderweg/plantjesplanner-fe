import React, {useState} from "react";
import  axios from "axios";

function LoginPage({onLogin}){
   //use state for the form
    const[credentials, setCredentials] = useState({
        username:"",
        password:""
    });
    //use state for error handling
    const [error, setError] = useState("");


    function handleChange(e){
        const{name, value}=e.target;
        setCredentials((prev)=> ({
            ...prev,
            [name]:value
        }));
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
       setError("");

       try{
           const response = await axios.post("http://localhost:8080/login", credentials);
           const jwt = response.data;
           onLogin(jwt);
       }catch (err){
           setError("Inloggen mislukt. probeer het nog eens")
       }
    };

    return(
       <form onSubmit={handleSubmit}>
           <label htmlFor="username-field">Inlognaam:
               <input
                   type="text"
                   id="username-field"
                   name="username"
                   onChange={handleChange}
               />
           </label>
           <label htmlFor="password-field">Wachtwoord:
            <input
                type="password"
                id="password-field"
                name="password"
                onChange={handleChange}
            />
        </label>

           <button type="submit">Inloggen</button>
       {/*conditional rendering of error message*/}
           {error && <p><strong>{error}</strong></p>}
       </form>

   );
}

export default LoginPage;