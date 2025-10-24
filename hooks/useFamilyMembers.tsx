import {
    createFamilyMemberInDB,
    deleteFamilyMemberFromDB,
    getFamilyMembersFromDB,
    updateFamilyMemberInDB
} from "@/services/familyMembers";
import {useAppDispatch, useAppSelector} from "@/hooks/index";
import {addFamilyMember, setFamilyMembers, removeFamilyMember, setLoading, updateFamilyMember as updateFamilyMemberAction} from "@/store/reducers/familyMembersSlice";
import {FamilyMemberType} from "@/types";

export const useFamilyMembers = () => {
    const loading = useAppSelector(state => state.familyMembers.loading);
    const dispatch = useAppDispatch();

    const generateRandomId = (length = 6) => {
        return Math.random().toString(36).substring(2, length + 2);
    }

    const getFamilyMembers = async () => {
        try {
            dispatch(setLoading(true));
            const response = await getFamilyMembersFromDB();
            if (!response) return;
            const familyMembers: FamilyMemberType[] = response.map((document) => ({
                documentId: document.$id,
                id: document.id,
                name: document.name,
            }));
            dispatch(setFamilyMembers(familyMembers));
        } catch (error: any) {
            console.error(error?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const createFamilyMember = async (memberName: string) => {
        try {
            dispatch(setLoading(true));
            const member = {name: memberName, id: generateRandomId()};
            const response = await createFamilyMemberInDB(member);
            if (!response) return;
            dispatch(addFamilyMember(member));
            return response;
        } catch (error: any) {
            console.error(error?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const updateFamilyMember = async (member: FamilyMemberType) => {
        try {
            dispatch(setLoading(true));
            const response = await updateFamilyMemberInDB(member);
            if (!response) return;
            dispatch(updateFamilyMemberAction(member));
            return response;
        } catch (error: any) {
            console.error(error?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const deleteFamilyMember = async (memberId: string) => {
        try {
            dispatch(setLoading(true));
            const response = await deleteFamilyMemberFromDB(memberId);
            if (!response) return;
            dispatch(removeFamilyMember(memberId));
            return response;
        } catch (error: any) {
            console.error(error?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {loading, getFamilyMembers, createFamilyMember, updateFamilyMember, deleteFamilyMember};
};