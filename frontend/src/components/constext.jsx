import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {adminUrl} from "../server";
export const UserContext = createContext({});


export const CreatedContext = ({ children }) => {
    /**GETTING CREDENTIALS */
    axios.defaults.withCredentials = true
    const [admin, setAdmin] = useState("");

    const getAdmin = async () => {
        try {
            const { data } = await axios.get(`${adminUrl}/persistlogin`);
            console.log(data)
            setAdmin(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin();
    }, []);



    return (
        <UserContext.Provider value={{
            admin,
            setAdmin           
        }}>
            {children}
        </UserContext.Provider>
    )
}