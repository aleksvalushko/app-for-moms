import {Stack} from "expo-router";
import './global.css';
import {useColorScheme} from "nativewind";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {UserProvider} from "@/contexts/UserContext";
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <UserProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <StatusBar value="auto"/>
                <Stack>
                    <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                </Stack>
            </ThemeProvider>
        </UserProvider>
    );
}
