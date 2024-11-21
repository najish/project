import React,{useContext, useState, createContext} from "react";


const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = () => setIsLoggedIn(true)
    const logout = () => setIsLoggedIn(false)

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider
export const useAuth = () => useContext(AuthContext)