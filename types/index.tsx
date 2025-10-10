import {Models} from "react-native-appwrite";

export type UserProviderProps = {
    user: Models.User<Models.Preferences> | null,
    login: (email, password, name) => void;
    register: (email, password, name) => void;
    logout: () => void;
}