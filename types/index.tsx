import {Models} from "react-native-appwrite";

export type UserProviderProps = {
    user: Models.User<Models.Preferences> | null,
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
}