import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FamilyMembersType, FamilyMemberType} from "@/types";

const initialState: FamilyMembersType = {
    familyMembers: [],
    familyMember: {
        id: '',
        name: ''
    },
    familyMemberName: '',
    loading: false
}

const familyMembersSlice = createSlice({
    name: 'familyMembers',
    initialState,
    reducers: {
        setFamilyMembers: (state, action: PayloadAction<FamilyMemberType[]>) => {
            state.familyMembers = action.payload;
        },
        chooseFamilyMember: (state, action: PayloadAction<FamilyMemberType>) => {
            state.familyMember = action.payload;
        },
        addFamilyMember: (state, action: PayloadAction<FamilyMemberType>) => {
            state.familyMembers.push(action.payload);
        },
        updateFamilyMember: (state, action: PayloadAction<FamilyMemberType>) => {
            const index = state.familyMembers.findIndex(member => member.id === action.payload.id);
            if (index !== -1) {
                state.familyMembers[index] = action.payload;
            }
        },
        removeFamilyMember: (state, action: PayloadAction<string>) => {
            state.familyMembers = state.familyMembers.filter(member => member.documentId !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setFamilyMemberName: (state, action: PayloadAction<string>) => {
            state.familyMemberName = action.payload;
        },
    },
});

export const {
    setFamilyMembers,
    chooseFamilyMember,
    addFamilyMember,
    updateFamilyMember,
    removeFamilyMember,
    setLoading,
    setFamilyMemberName,
} = familyMembersSlice.actions;

export default familyMembersSlice.reducer;