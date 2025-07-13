import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    return(
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}