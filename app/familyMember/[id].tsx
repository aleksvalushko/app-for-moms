import {router, useLocalSearchParams} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomText from "@/components/CustomText";
import {COLORS} from "@/constants/colors";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import React from "react";
import {useColorScheme} from "nativewind";
import {useUser} from "@/hooks/useUser";

export default function FamilyMember() {
    const {id} = useLocalSearchParams();
    const {colorScheme} = useColorScheme();
    const {user} = useUser();

    const goBack = () => {
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

    return (
        <SafeAreaView className='flex-1 justify-center items-center p-[10px]'>
            <CustomText className='flex-1 flex w-full h-full items-center justify-center text-black dark:text-white'> Family member id: {id}</CustomText>
            <CustomTouchableHighlight pressFunction={goBack} name='Вернуться назад'
                                      underlayColor={COLORS[colorScheme].colors.underlayForListElement}
                                      className='flex-5 max-h-[50px] bg-listElement w-full'
                                      textClassName='text-white text-[20px]'
                                      iconName='arrow-left' isLeftIcon={true}/>
        </SafeAreaView>
    )
}