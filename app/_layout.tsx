import {Stack} from "expo-router";
import './global.css';
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {UserProvider} from "@/contexts/UserContext";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import store from "@/store/store";
import { useColorScheme } from 'react-native';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const customTheme = {
        darkTheme: {
        // 'dark': {
            ...DarkTheme,
            colors: {
                ...DarkTheme.colors,
                background: 'rgb(27,27,27)',
                text: '#fff'
            },
        },
        lightTheme: {
        // 'light': {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                primary: '#1144AA',
                secondary: '#29467F',
                accent: '#4575D4',
                positive: '#21ba45',
                negative: '#c10015',
                info: '#31ccec',
                activeTab: '#4575D4',
                closeBtn: '#999aa1',
                deleteBtn: '#f44336',
                warning: '#f2c037'
            },
        }
    }

    // const getThemeValue = () => {
    //     switch (colorScheme) {
    //         case 'dark':
    //             return customTheme.darkTheme;
    //         case 'light':
    //             return customTheme.lightTheme;
    //         default:
    //             return customTheme.lightTheme;
    //     }
    // };

    return (
        <Provider store={store}>
            <UserProvider>
                <ThemeProvider value={colorScheme === 'dark' ? customTheme.darkTheme : customTheme.lightTheme}>
                    <StatusBar value="auto"/>
                    <Stack>
                        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    </Stack>
                </ThemeProvider>
            </UserProvider>
        </Provider>
    );
}
