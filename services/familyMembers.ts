import {databases} from "@/lib/appwrite";
import {ID} from "react-native-appwrite";
import {FamilyMemberType} from "@/types";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

export const getFamilyMembersFromDB = async () => {
    const result= await databases.listDocuments(DATABASE_ID, COLLECTION_ID, []);
    return result.documents;
};

export const createFamilyMemberInDB = async (member: FamilyMemberType) => {
    const {documentId, ...documentData} = member;
    
    const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        documentData
    );
    if (!response) return;
    await getFamilyMembersFromDB();
    return response;
};

export const updateFamilyMemberInDB = async (member: FamilyMemberType) => {
    
    const {documentId, ...documentData} = member;
    if (!documentId) return;
    
    const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        documentData
    );
    if (!response) return;
    await getFamilyMembersFromDB();
    return response;
};

export const deleteFamilyMemberFromDB = async (memberId: string) => {
    const response = await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        memberId
    );
    if (!response) return;
    await getFamilyMembersFromDB();
    return response;
};