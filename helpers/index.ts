import {router} from "expo-router";

//TODO создать тип для юзера
export const goBack = (user: any) => {
    if (router.canGoBack()) {
        router.back();
        return;
    }
    if (user !== null) {
        router.replace("/(tabs)");
        return;
    }
    router.replace("/(auth)");
};