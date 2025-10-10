import {createContext, useEffect, useState} from "react";
import {ID, Models} from "react-native-appwrite";
import {account} from "@/lib/appwrite";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    const login = async (email, password) => {
        await account.createEmailPasswordSession({
            email,
            password
        });
        const response = await account.get();
        setUser(response);
    };

    const register = async (email, password, name) => {
        await account.create({
            userId: ID.unique(),
            email,
            password,
            name
        });
        const response = await account.get();
        setUser(response);
    };

    const logout = async () => {
        await account.deleteSession('current')
        setUser(null);
    };

    const getInitialUser = async () => {
        try {
            const response = await account.get();
            setUser(response);
        } catch(error: any) {
            setUser(null);
        }
    };

    useEffect(() => {
        getInitialUser();
    }, []);

    return (
        <UserContext.Provider value={{user, login, register, logout}}>
            {children}
        </UserContext.Provider>
    );
};