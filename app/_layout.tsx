import {Stack} from "expo-router";

export default function RootLayout() {
    return <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false, }}/>
        {/*<Stack.Screen*/}
        {/*    name="family-member-modal"*/}
        {/*    options={{*/}
        {/*        presentation: 'transparentModal',*/}
        {/*        animation: 'fade',*/}
        {/*        headerShown: false,*/}
        {/*    }}*/}
        {/*/>*/}
        {/*<Stack.Screen name="movie/[id]" options={{headerShown: false}}/>*/}
    </Stack>;
}
