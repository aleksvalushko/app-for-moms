import {combineReducers, configureStore} from '@reduxjs/toolkit';
import familyMembersSlice from "@/store/reducers/familyMembersSlice";

const rootReducer = combineReducers({
    familyMembers: familyMembersSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
