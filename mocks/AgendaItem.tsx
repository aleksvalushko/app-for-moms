import React, {useCallback} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import CustomText from "@/components/CustomText";
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";
import CustomPressable from "@/components/Buttons/CustomPressable";

interface ItemProps {
    item: any;
}

const AgendaItem = (props: ItemProps) => {
    const {item} = props;

    const buttonPressed = useCallback(() => {
        Alert.alert('Show me more');
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, [item]);

    if (!Object.keys(item).length) {
        return (
            <View
                className='w-full flex flex-row items-center justify-center min-h-[52px] p-[20px] border-b-[1px] border-gray-500'>
                <CustomText className='text-[14px] text-black dark:text-white'>Событий не запланированно на сегодня</CustomText>
            </View>
        );
    }

    return (
        <CustomTouchableOpacity pressFunction={itemPressed} className='p-[20px] border-b-[1px] border-gray-500'
                                style={styles.item}>
            <View className='flex flex-column items-center'>
                <CustomText className='text-black dark:text-white'>{item.hour}</CustomText>
                <CustomText className='text-gray-400'>{item.duration}</CustomText>
            </View>
            <CustomText className='font-bold text-[16px] text-black dark:text-white'>{item.title}</CustomText>
            <CustomPressable pressFunction={buttonPressed} title='Info' className='items-start'
                             textClassName='text-black dark:text-white'/>
        </CustomTouchableOpacity>
    );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
    item: {
        width: '100%',
        // borderBottomWidth: 1,
        // borderBottomColor: 'darkgrey',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});