import { useRouter } from 'expo-router'
import React, {ReactNode, useEffect} from 'react'
import ThemedLoader from "../ThemeLoader";
import {useUser} from "@/hooks/useUser";

type UserOnlyProps = {
  children: ReactNode;
}

const UserOnly: React.FC<UserOnlyProps> = ({ children }) => {
  const { user } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login")
    }
  }, [user])


  if (!user) {
    return (
      <ThemedLoader />
    )
  }
  
  return children
}

export default UserOnly