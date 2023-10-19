import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);

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

    const login = async (email, pass) => {

        try{
            const res = await axios.post("/api/user/login", {
                email: email,
                password: pass
            });

            localStorage.setItem("NoteToken", res.data.token)
            setUser(res.data.uname);


        }catch (err){
            console.log(err.response.data.msg);  
        }
        
    }

    const logout = () => {
        localStorage.removeItem("NoteToken");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}