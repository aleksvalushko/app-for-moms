import {useRouter} from 'expo-router'
import React, {ReactNode, useEffect} from 'react'
import ThemedLoader from "../ThemeLoader";
import {useUser} from "@/hooks/useUser";
import {useFamilyMembers} from "@/hooks/useFamilyMembers";
import {useAppSelector} from "@/hooks";

type UserOnlyProps = {
    children: ReactNode;
}

const UserOnly: React.FC<UserOnlyProps> = ({children}) => {
    const {user} = useUser()
    const {getFamilyMembers} = useFamilyMembers()
    const loading = useAppSelector(state => state.familyMembers.loading)
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace("/(auth)/login")
        } else {
            getFamilyMembers();
        }
    }, [user])


    if (!user) {
        return (
            <ThemedLoader loading={loading}/>
        )
    }

    return (
        <>
            {children}
            <ThemedLoader loading={loading}/>
        </>
    )
}

export default UserOnly