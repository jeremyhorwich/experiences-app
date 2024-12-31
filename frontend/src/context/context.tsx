import React, { createContext, Dispatch, ReactNode, useState } from "react";
import { Experience } from "../dataTypes/experiences";

type contextType = {
    userId: string,
    setUserId: Dispatch<React.SetStateAction<string>>,
    username: string,
    setUsername: Dispatch<React.SetStateAction<string>>,
    token: string,
    setToken: Dispatch<React.SetStateAction<string>>,
    detailExperience: Experience|null,
    setDetailExperience: Dispatch<React.SetStateAction<Experience|null>>,
    usersToRate: Array<string>,
    setUsersToRate: Dispatch<React.SetStateAction<Array<string>>>,
    usersToRateFirstNames: Array<string>,
    setUsersToRateFirstNames: Dispatch<React.SetStateAction<Array<string>>>,
    activityToRate: string,
    setActivityToRate: Dispatch<React.SetStateAction<string>>
}

export const Context = createContext<contextType | null>(null);

function ContextProvider({ children }: {children: ReactNode} ) {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [detailExperience, setDetailExperience] = useState<Experience|null>(null)
    const [usersToRate, setUsersToRate] = useState([""])
    const [usersToRateFirstNames, setUsersToRateFirstNames] = useState([""])
    const [activityToRate, setActivityToRate] = useState("")

    return (
        <Context.Provider 
            value={{ 
                userId, setUserId,
                username, setUsername,
                token, setToken,
                detailExperience, setDetailExperience,
                usersToRate, setUsersToRate,
                usersToRateFirstNames, setUsersToRateFirstNames,
                activityToRate, setActivityToRate
            }}
        >
            { children }
        </Context.Provider>
    );
};

export { ContextProvider }