import {StatusBar} from "expo-status-bar";
import GuestOnly from "@/components/Auth/GuestOnly";
import AuthComponent from "@/app/(auth)/index";

const AuthLayout = () =>  {
    return (
        <GuestOnly>
            <StatusBar style="auto" />
            <AuthComponent />
        </GuestOnly>
    )
};

export default AuthLayout;