import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState(0)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
