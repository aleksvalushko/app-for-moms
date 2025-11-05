import {useRouter} from 'expo-router'
import React, {ReactNode, useEffect} from 'react'
import ThemedLoader from "../ThemeLoader";
import {useUser} from "@/hooks/useUser";
import {useFamilyMembers} from "@/hooks/useFamilyMembers";

type UserOnlyProps = {
    children: ReactNode;
}

const GuestOnly: React.FC<UserOnlyProps> = ({children}) => {
    const {user} = useUser()
    const {loading} = useFamilyMembers();
    const router = useRouter()

    useEffect(() => {
        if (user !== null) {
            router.replace("/(tabs)")
        }
    }, [user])

    if (user) {
        return (
            <ThemedLoader loading={loading}/>
        )
    }

    return <>
        {children}
        <ThemedLoader loading={loading}/>
    </>
}

export default GuestOnly