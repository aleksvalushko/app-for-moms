import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import CustomPressable from "@/components/Buttons/CustomPressable";
import ModalWrapper from "@/components/Modals/ModalWrapper";
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";
import CustomTextInput from "@/components/Inputs/CustomTextInput";

type PROPS = {
    isShowEventModal: boolean,
    setIsShowEventModal: (value: boolean) => void
}

const AddCalendarEvent = ({isShowEventModal, setIsShowEventModal}: PROPS) => {
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());
    const [isTime, setIsTime] = useState<boolean>(false);
    const [isDate, setIsDate] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [eventName, setEventName] = useState<string>('');

    const inputDate = useMemo(() => {
        let month: string | number = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day: string | number = date.getDate();
        day = day < 10 ? '0' + day : day;
        return `${day}.${month}.${date.getFullYear()}`;
    }, [date]);

    const inputTime = useMemo(() => {
        let hours: string | number = time.getHours();
        hours = hours < 10 ? '0' + hours : hours;
        let minutes: string | number = time.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes}`;
    }, [time]);

    const chooseDate = (event: DateTimePickerEvent, selectedDate: Date) => {
        setDate(selectedDate);
    };

    const chooseTime = (event: DateTimePickerEvent, selectedTime: Date) => {
        setTime(selectedTime);
    };

    return (
        <ModalWrapper isOpen={isShowEventModal}>
            <View className='bg-white dark:bg-darkModalBackground gap-y-4' style={styles.modalWrapper}>
                <View className='flex-row gap-x-2 w-full justify-between items-center'>
                    <CustomPressable pressFunction={() => {
                        setIsShowEventModal(false)
                    }} title='Отменить' className='flex flex-row items-center'
                                     textClassName='text-negative text-[18px]'/>
                    <Text className='text-black dark:text-white text-[18px]'>Создать</Text>
                    <CustomPressable pressFunction={() => {
                        setIsShowEventModal(false)
                    }} title='Добавить' className='flex flex-row items-center'
                    disabled={!eventName} textClassName='text-negative text-[18px] disabled:text-gray-500'/>
                </View>
                <View className='flex flex-column gap-y-4'>
                    <CustomTextInput value={eventName} onChangeText={setEventName} className='border-gray-500 dark:border-gray-600'
                                     placeholder='Название' placeholderTextColor='#9E9E9E' labelClassName='text-black dark:text-white text-[16px]'
                                     style={{margin: 0, width: '100%', paddingRight: '25px'}}/>
                    <View className='flex flex-row w-full justify-between items-center'>
                        <Text className='text-black dark:text-white text-[18px]'>Дата и время</Text>
                        <View className='flex flex-row gap-x-2'>
                            <CustomTouchableOpacity pressFunction={() => {
                                setIsTime(false);
                                setIsDate(!isDate);
                            }} style={styles.textInput}>
                                <Text className='text-black dark:text-white text-[18px]'>{inputDate}</Text>
                            </CustomTouchableOpacity>
                            <CustomTouchableOpacity pressFunction={() => {
                                setIsDate(false);
                                setIsTime(!isTime);
                            }} style={styles.textInput}>
                                <Text className='text-black dark:text-white text-[18px]'>{inputTime}</Text>
                            </CustomTouchableOpacity>
                        </View>
                    </View>
                    {isDate && <DateTimePicker
                        value={date}
                        mode='date'
                        locale='ru-RU'
                        display='inline'
                        onChange={chooseDate}
                    />}
                    {isTime && <DateTimePicker
                        value={time}
                        mode='time'
                        locale='ru-RU'
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={chooseTime}
                    />}
                </View>
                <CustomTextInput value={description} onChangeText={setDescription} className='border-gray-500 dark:border-gray-600'
                                 placeholder='Описание' placeholderTextColor='#9E9E9E' labelClassName='text-black dark:text-white text-[16px]'
                                 clearable={false} multiline style={{margin: 0, width: '100%', paddingRight: '25px', minHeight: '300px'}}/>
            </View>
        </ModalWrapper>
    );
};

export default AddCalendarEvent;

const styles = StyleSheet.create({
    modalWrapper: {
        width: '100%',
        // height: '70%',
        padding: 20,
        borderRadius: 10,
    },
    textInput: {
        backgroundColor: '#474746',
        padding: 10,
        borderRadius: 8
    }
});