import {COLORS} from "@/constants/colors";
import {useColorScheme} from "nativewind";

export const darkThemeColor = 'rgb(71,71,71)';

export function getTheme() {
    const {colorScheme} = useColorScheme();

    const isDarkMode = colorScheme === 'dark';
    const disabledColor = 'grey';

    return {
        expandableKnobColor: darkThemeColor,
        disabledDotColor: disabledColor,
        textDayStyle: {marginTop: 1},
        dotStyle: {marginTop: -2},
        backgroundColor: isDarkMode ? COLORS[colorScheme].colors.background : COLORS[colorScheme].colors.background,
        calendarBackground: isDarkMode ? COLORS[colorScheme].colors.background : COLORS[colorScheme].colors.background,
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#00adf5',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 20,
        textMonthFontSize: 25,
        textDayHeaderFontSize: 16
    };
}