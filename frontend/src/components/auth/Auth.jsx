import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState();

    useEffect(()=>{

        const checkLogin = async () => {
            const token = localStorage.getItem('NoteToken');

            if(token){
                const uname = await axios.get("/api/user/verify", {
                    headers: {Authorization: token}
                });

                if(!uname) localStorage.removeItem('NoteToken');

                setUser(uname);
            }
        }
        checkLogin();

    },[user]);

    const logout = () => {
        localStorage.removeItem("NoteToken");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}