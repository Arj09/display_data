import React from "react";
import {UserContext} from "./Context";

export const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(1)
    const [img, setImg] = React.useState("")
    return(
        <UserContext.Provider value={{user, setUser, img, setImg}}>
        {children}
        </UserContext.Provider>
    )
}

