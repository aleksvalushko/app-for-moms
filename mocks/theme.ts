import {COLORS} from "@/constants/colors";

export const darkThemeColor = 'rgb(71,71,71)';

export function getTheme(colorScheme: 'light' | 'dark' | null | undefined) {
    const isDarkMode = colorScheme === 'dark';
    const disabledColor = 'grey';

    return {
        backgroundColor: isDarkMode
            ? COLORS[colorScheme].colors.background
            : COLORS[colorScheme].colors.background,
        calendarBackground: isDarkMode
            ? COLORS[colorScheme].colors.background
            : COLORS[colorScheme].colors.background,
        textDayStyle: { marginTop: 1 },
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: isDarkMode
            ? COLORS[colorScheme].colors.text
            : COLORS[colorScheme].colors.text,
        textDisabledColor: disabledColor,
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        disabledDotColor: disabledColor,
        dotStyle: { marginTop: -2 },
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
        textDayHeaderFontSize: 16,
    };
}