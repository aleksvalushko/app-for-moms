import React from "react";
import {goBack} from "@/helpers";
import CustomTouchableHighlight from "@/components/Buttons/CustomTouchableHighlight";
import {Models} from "react-native-appwrite";
import {useColorScheme} from "nativewind";

type Props = {
    user?: Models.User<Models.Preferences> | null;
};

const GoBackButton = ({ user }: Props) => {
    const {colorScheme} = useColorScheme();

    const isDarkMode = colorScheme === 'dark';

    return (
        <CustomTouchableHighlight pressFunction={() => goBack(user)} name='Назад'
                                  className='absolute left-0 flex flex-row items-center p-0 active:opacity-100'
                                  textClassName='text-black dark:text-white text-[15px]'
                                  iconName='keyboard-arrow-left' iconColor={isDarkMode ? 'white' : 'black'} size={30} isLeftIcon={true}/>
    );
}

export default GoBackButton;