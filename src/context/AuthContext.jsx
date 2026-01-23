import { createContext, useContext, useState, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [loading, setLoading] = useState(true);

    //central Get /users/me API call to backend
    useEffect(() => {
        async function fetchUser() {
            if (!jwt) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:8080/users/me",
                    {
                        headers: { Authorization: `Bearer ${jwt}` },
                    }
                );

                setRole(response.data.role);
                setUsername(response.data.username);

                localStorage.setItem("role", response.data.role);
                localStorage.setItem("username", response.data.username);
            } catch (error) {
                console.error("User ophalen mislukt, logout");
                logout();
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [jwt]);

    function login(jwt, role, username) {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);

        setJwt(jwt);
        setRole(role);
        setUsername(username);
    }

    function logout(){
        localStorage.clear();
        setJwt(null);
        setRole(null);
        setUsername(null);
    }
      const value = {
        jwt,
        role,
        username,
        isAuthenticated: !!jwt,
        loading,
        login,
        logout,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

//custom hook
export function useAuth() {
    return useContext(AuthContext);
}