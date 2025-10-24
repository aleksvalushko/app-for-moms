import {Stack} from "expo-router";
import './global.css';
import {useColorScheme} from "nativewind";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {UserProvider} from "@/contexts/UserContext";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import store from "@/store/store";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <UserProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
