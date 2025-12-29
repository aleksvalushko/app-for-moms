import React, {useRef, useCallback, useState} from 'react';
import {Animated, Easing, StyleSheet, View, Text} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar, LocaleConfig} from 'react-native-calendars';
import {agendaItems, getMarkedDates} from '@/constants/agendaItems';
import AgendaItem from '@/components/AgendaItem';
import {getTheme, darkThemeColor} from '@/mocks/theme';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useAppSelector} from "@/hooks";
import CustomTouchableOpacity from "@/components/Buttons/CustomTouchableOpacity";
import {COLORS} from "@/constants/colors";
import {useColorScheme} from "nativewind";
import {useUser} from "@/hooks/useUser";
import GoBackButton from "@/components/Buttons/GoBackButton";
import CustomPressable from "@/components/Buttons/CustomPressable";
import ModalWrapper from "@/components/Modals/ModalWrapper";
import dayjs from 'dayjs';

LocaleConfig.locales['ru'] = {
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ],
    monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль.', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
    dayNames: [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
    today: "Сегодня"
};
LocaleConfig.defaultLocale = 'ru';

const ITEMS: any[] = agendaItems;

type PROPS = {
    weekView?: boolean;
}

// const CHEVRON = require('@/img/next.png');

const ExpandableCalendarScreen = (props: PROPS) => {
    const {weekView} = props;
    const [currentDay, setCurrentDay] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const marked = useRef(getMarkedDates());
    const theme = useRef(getTheme());
    const todayBtnTheme = useRef({
        todayButtonTextColor: darkThemeColor
    });
    const {colorScheme} = useColorScheme();
    const {user} = useUser();
    const [isShowEventModal, setIsShowEventModal] = useState<boolean>(false);
    const isDarkMode = colorScheme === 'dark';

    const familyMember = useAppSelector(state => {
        return state.familyMembers.familyMember;
    });

    const renderItem = useCallback(({item}: any) => {
        return <AgendaItem item={item}/>;
    }, []);

    const calendarRef = useRef<{ toggleCalendarPosition: () => boolean }>(null);
    const rotation = useRef(new Animated.Value(0));

    const toggleCalendarExpansion = useCallback(() => {
        const isOpen = calendarRef.current?.toggleCalendarPosition();
        Animated.timing(rotation.current, {
            toValue: isOpen ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
    }, []);

    const renderHeader = useCallback(
        (date) => {
            const rotationInDegrees = rotation.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '-180deg']
            });
            return (
                <CustomTouchableOpacity style={styles.header} pressFunction={toggleCalendarExpansion}>
                    <Text style={styles.headerTitle} className='text-black dark:text-white'>{date?.toString('MMMM yyyy')}</Text>
                    {/*<Animated.Image source={CHEVRON} style={{transform: [{rotate: '90deg'}, {rotate: rotationInDegrees}], color: 'white'}}/>*/}
                </CustomTouchableOpacity>
            );
        },
        [toggleCalendarExpansion]
    );

    const onCalendarToggled = useCallback(
        (isOpen: boolean) => {
            rotation.current.setValue(isOpen ? 1 : 0);
        },
        [rotation]
    );

    return (
        <SafeAreaView className='flex-1 justify-center items-center p-[10px]'>
            <View className='w-full flex-row justify-center items-center relative my-[10px]'>
                <GoBackButton user={user} />
                <Text className='text-[30px] text-black dark:text-white'>{familyMember?.name ?? ''}</Text>
                <CustomPressable className='bg-transparent' textClassName='text-white text-[20px]'
                                 pressFunction={() => setIsShowEventModal(true)} rounded={true} iconName='add'
                                 style={styles.addEventButton}/>
            </View>
            <SafeAreaProvider style={styles.provider}>
                <SafeAreaView style={styles.container}>
                    <CalendarProvider
                        date={ITEMS[1]?.title}
                        showTodayButton
                        theme={todayBtnTheme.current}
                        todayBottomMargin={5}
                    >
                        {weekView ? (
                            <WeekCalendar firstDay={1} markedDates={marked.current}/>
                        ) : (
                            <ExpandableCalendar
                                renderHeader={renderHeader}
                                ref={calendarRef}
                                onCalendarToggled={onCalendarToggled}
                                theme={theme.current}
                                firstDay={1}
                                markedDates={marked.current}
                                onDayPress={(day) => setCurrentDay(day.dateString)}
                            />
                        )}
                        <AgendaList
                            sections={ITEMS}
                            renderItem={renderItem}
                            sectionStyle={{
                                backgroundColor: isDarkMode ? COLORS[colorScheme].colors?.darkAgendaItemBackground : COLORS[colorScheme].colors?.agendaItemBackground,
                                padding: 10}}
                        />
                    </CalendarProvider>
                </SafeAreaView>
            </SafeAreaProvider>

            <ModalWrapper isOpen={isShowEventModal}>
                <View className='bg-white dark:bg-darkModalBackground' style={styles.modalWrapper}>
                    <View className='flex-row gap-x-2 w-full justify-between items-center'>
                        <CustomPressable pressFunction={() => {
                            console.log(currentDay)
                            setIsShowEventModal(false)
                        }} title='Отменить' className='flex flex-row items-center'
                                         textClassName='text-negative text-[18px]'/>
                        <Text className='text-black dark:text-white text-[18px]'>Создать</Text>
                        <CustomPressable pressFunction={() => {
                            console.log(currentDay)
                            setIsShowEventModal(false)
                        }} title='Добавить' className='flex flex-row items-center'
                                         textClassName='text-negative text-[18px]'/>
                    </View>
                    <Text className='text-black dark:text-white'>Вот тут будет создание события в календаре</Text>
                </View>
            </ModalWrapper>
        </SafeAreaView>
    );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
    calendar: {
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    headerTitle: {
        fontSize: 25,
        marginRight: 20
    },
    provider: {
        width: '100%',
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    addEventButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 40,
        fontSize: 14,
        marginVertical: 5,
        position: 'absolute',
        right: 0,
        top: -7
    },
    modalWrapper: {
        width: '100%',
        height: '70%',
        padding: 20,
        borderRadius: 10,
        rowGap: 15
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20
    },
});