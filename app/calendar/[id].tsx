import React, {useRef, useCallback, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
    AgendaList,
    CalendarProvider,
    LocaleConfig,
    Calendar
} from 'react-native-calendars';
import {agendaItems, getMarkedDates} from '@/constants/agendaItems';
import AgendaItem from '@/components/AgendaItem';
import {getTheme, darkThemeColor} from '@/mocks/theme';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {useAppSelector} from "@/hooks";
import {COLORS} from "@/constants/colors";
import {useColorScheme} from "nativewind";
import {useUser} from "@/hooks/useUser";
import GoBackButton from "@/components/Buttons/GoBackButton";
import CustomPressable from "@/components/Buttons/CustomPressable";
import dayjs from 'dayjs';
import AddCalendarEvent from "@/ui/Modals/AddCalendarEvent";

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

const ExpandableCalendarScreen = () => {
    const [currentDay, setCurrentDay] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const marked = useRef(getMarkedDates());
    const todayBtnTheme = useRef({
        todayButtonTextColor: darkThemeColor,
    });
    const {colorScheme} = useColorScheme();
    const {user} = useUser();
    const [isShowEventModal, setIsShowEventModal] = useState<boolean>(false);
    const isDarkMode = colorScheme === 'dark';

    const theme = React.useMemo(
        () => getTheme(colorScheme),
        [colorScheme],
    );

    const markedDates = React.useMemo(() => {
        const copy = {...marked.current};

        if (currentDay) {
            copy[currentDay] = {
                ...(copy[currentDay] || {}),
                selected: true,
            };
        }

        return copy;
    }, [currentDay]);

    const familyMember = useAppSelector(state => {
        return state.familyMembers.familyMember;
    });

    const renderItem = useCallback(({item}: any) => {
        return <AgendaItem item={item}/>;
    }, []);

    const renderHeader = (date) => {
        return <Text style={styles.headerTitle} className='text-black dark:text-white'>{date?.toString('MMMM yyyy')}</Text>
    };

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
                            <Calendar
                                renderHeader={renderHeader}
                                theme={theme}
                                firstDay={1}
                                markedDates={markedDates}
                                enableSwipeMonths
                                onDayPress={(day) =>setCurrentDay(day.dateString)}
                            />
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

            <AddCalendarEvent isShowEventModal={isShowEventModal} setIsShowEventModal={setIsShowEventModal} />
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
});