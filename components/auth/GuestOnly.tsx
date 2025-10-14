import { useRouter } from 'expo-router'
import React, {ReactNode, useEffect} from 'react'
import ThemedLoader from "../ThemeLoader";
import {useUser} from "@/hooks/useUser";

type UserOnlyProps = {
  children: ReactNode;
}

const GuestOnly: React.FC<UserOnlyProps> = ({ children }) => {
  const { user } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    if (user !== null) {
      router.replace("/(tabs)")
    }
  }, [user])

  if (user) {
    return (
      <ThemedLoader />
    )
  }

  return children
}

export default GuestOnly