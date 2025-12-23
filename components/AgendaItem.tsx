import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Text} from 'react-native';
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";
import CustomPressable from "@/components/Buttons/CustomPressable";

type ItemType = {
    item: any;
}

const AgendaItem = ({item}: ItemType) => {

    const buttonPressed = useCallback(() => {
        Alert.alert('Show me more');
    }, []);

    const itemPressed = useCallback(() => {
        Alert.alert(item.title);
    }, [item]);

    if (!Object.keys(item).length) {
        return (
            <View
                className='w-full flex flex-row items-center justify-center min-h-[52px] p-[20px]'>
                <Text className='text-[14px] text-black dark:text-white'>Событий не запланированно на сегодня</Text>
            </View>
        );
    }

    return (
        <CustomTouchableOpacity pressFunction={itemPressed} className='p-[20px] first:border-b-[1px] border-gray-500'
                                style={styles.item}>
            <View className='flex flex-column items-center'>
                <Text className='text-black dark:text-white'>{item.hour}</Text>
                <Text className='text-gray-500'>{item.duration}</Text>
            </View>
            <Text className='font-bold text-[16px] flex flex-row items-center text-black dark:text-white'>{item.title}</Text>
            <CustomPressable pressFunction={buttonPressed} title='Info' className='flex flex-row items-center '
                             textClassName='text-black dark:text-white'/>
        </CustomTouchableOpacity>
    );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});