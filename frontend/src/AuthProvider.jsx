import { createContext, useContext, useState, useEffect } from 'react';
import Axios from './axios';
import { toast } from 'react-toastify';


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('NoteToken');

        if(token){
            setIsLoading(true);
            const isLogin = async () =>{
                await Axios.get("/api/user/verify", {
                    headers: { Authorization: token }
                })
                    .then((res)=>{
                        setUser(res.data)
                        setIsLoading(false)
                    })
                    .catch((err)=>{
                        setIsLoading(false)
                    })
        }
        isLogin(); 
        }
    }, [])


    

    const signUp = async (userData) => {

        setIsLoading(true);

        await Axios.post("/api/user/register", userData)
            .then((res) => {
                setIsLoading(false);
                toast.success("Registration Successfull!!")
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error(err.response.data.msg);
            })
    };

    const login = async (userData) => {

        setIsLoading(true);

        await Axios.post("/api/user/login", userData)
            .then((res) => {
                localStorage.setItem("NoteToken", res?.data?.token);
                setUser(res.data.uname);
                setIsLoading(false);
                toast.success("Login Success!!")
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error(err.response.data.msg);
            })
    };

    const logout = () => {
        localStorage.removeItem("NoteToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
