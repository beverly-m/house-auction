import  Axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AccountContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState({loggedIn: null, email: null, role: null});
    
    const PORT = process.env.REACT_APP_PORT || 'localhost:'+5000;

    useEffect(() => {
        Axios.get(`http://${PORT}/api/v1/admin`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
            })
            .catch(err => {
                setUser({ loggedIn: false, email: null, role: null });
                return; 
            })
            .then( response => {
                if (!response || !response.data || response.status !== 200) {
                    setUser({ loggedIn: false, email: null, role: null })
                    return;
                } else {
                    setUser(response.data)
                }
            })
        }, [])
    return (
        <AccountContext.Provider value={{user, setUser}}>
            {children}
        </AccountContext.Provider>
    )
}

export default UserContext;