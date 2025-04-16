import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {View, Text} from "react-native";

const TabIcon = ({focused, color, icon, title}) => {
    if (focused) {
        return (
            <View className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
                <FontAwesome size={24} name={icon} color={color} />
                <Text className="text-white font-semibold ml-2">{title}</Text>
            </View>
        )
    } else {
        return (
            <View className="size-full justify-center items-center mt-4 text-white rounded-full">
                <FontAwesome size={24} name={icon} color={color} />
            </View>
        )
    }
}

const _Layout = () => {
    return <Tabs screenOptions={{
        tabBarActiveTintColor: '#4575D4',
        tabBarActiveBackgroundColor: '#6B8FD4',
        tabBarShowLabel: false,
        tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tabBarStyle: {
            height: 60,
            marginHorizontal: 10,
            marginBottom: 36,
            position: 'absolute',
            bottom: 10,
            borderRadius: 50,
            backgroundColor: '#05296E',
            overflow: 'hidden',
        }
    }}>
        <Tabs.Screen name="index" options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused, color}) => <TabIcon focused={focused} color={color} icon="home" title="Home" />
        }}/>
        <Tabs.Screen name="settings" options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({focused, color}) => <TabIcon focused={focused} color={color} icon="gears" title="Settings" />
        }}/>
        {/*tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color}/>*/}
        {/*<Tabs.Screen name="search" options={{ title: 'Search', headerShown: false, tabBarIcon: ({focused}) => (*/}
        {/*        <TabIcon focused={focused} icon={icons.search} title="Search" />*/}
        {/*    ) }} />*/}
        {/*<Tabs.Screen name="saved" options={{ title: 'Saved', headerShown: false, tabBarIcon: ({focused}) => (*/}
        {/*        <TabIcon focused={focused} icon={icons.save} title="Saved" />*/}
        {/*    ) }} />*/}
        {/*<Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false, tabBarIcon: ({focused}) => (*/}
        {/*        <TabIcon focused={focused} icon={icons.person} title="Profile" />*/}
        {/*    ) }} />*/}
    </Tabs>
}

export default _Layout;