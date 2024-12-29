import { createContext, Dispatch, ReactNode, useState } from "react";

type UserContextType = {
    userId: string,
    setUserId: Dispatch<React.SetStateAction<string>>,
    username: string,
    setUsername: Dispatch<React.SetStateAction<string>>,
    token: string,
    setToken: Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: {children: ReactNode} ) => {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    return (
        <UserContext.Provider 
            value={{ 
                userId, setUserId,
                username, setUsername,
                token, setToken
            }}
        >
            { children }
        </UserContext.Provider>
    );
};