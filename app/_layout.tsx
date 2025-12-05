import {Stack} from "expo-router";
import './global.css';
import {ThemeProvider} from "@react-navigation/native";
import {UserProvider} from "@/contexts/UserContext";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import store from "@/store/store";
import {useColorScheme} from "nativewind";
import {COLORS} from "@/constants/colors";

export default function RootLayout() {
    const {colorScheme} = useColorScheme();

    return (
        <Provider store={store}>
            <UserProvider>
                <ThemeProvider value={colorScheme === 'dark' ? COLORS.dark : COLORS.light}>
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
