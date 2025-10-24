import {Models} from "react-native-appwrite";

export type UserProviderProps = {
    user: Models.User<Models.Preferences> | null,
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
    logout: () => void;
};

export type FamilyMemberType = {
    documentId?: string;
    id: string;
    name: string;
};

export type FamilyMembersType = {
    familyMembers: FamilyMemberType[];
    familyMember: FamilyMemberType;
    familyMemberName: string;
    loading: boolean;
};
