import React, { useContext } from "react";


/* import contexts here */

import { UserContext } from "../../context/UserContext";

const Dummy = () => {

    const { user, login, logout, isLoggedIn } = useContext(UserContext)
    console.log(isLoggedIn)
    return (
        <>
            <h1>Hello from dummy</h1>
            <h2>User: {isLoggedIn ? user.username : "none"}</h2>
        </>
    )
}

export default Dummy