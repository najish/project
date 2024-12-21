import React, {useState,createContext} from "react";


// 1. Create a context

const UserContext = createContext()


// 2. create a provider

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState([])
    const [searchItem, setSearchItem] = useState("")
    return (
        <UserContext.Provider value={{user, setUser, cart, setCart, searchItem, setSearchItem}}> 
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}