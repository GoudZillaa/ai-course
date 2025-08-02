import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token")||null);
    const [user,setUser] = useState(localStorage.getItem("user")||null);

    const login=(token,user)=>{
        setToken(token);
        setUser(user);
        localStorage.setItem("token",token);
        localStorage.setItem("user",user);
    };
    const logout=(token,user)=>{
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider value={{token,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>useContext(AuthContext)